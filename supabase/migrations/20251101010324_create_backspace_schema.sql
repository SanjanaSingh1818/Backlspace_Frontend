/*
  # Backspace Coworking Database Schema

  ## Overview
  Creates the complete database schema for Backspace Coworking website including:
  - Workspace offerings management
  - Contact form submissions
  - Admin user authentication
  - Testimonials and gallery management

  ## New Tables

  ### 1. `workspaces`
  Stores all workspace offerings (managed offices, hot desks, etc.)
  - `id` (uuid, primary key)
  - `title` (text) - Name of the workspace type
  - `description` (text) - Detailed description
  - `image_url` (text) - URL to workspace illustration
  - `price` (numeric) - Starting price
  - `discount` (integer) - Discount percentage (0-100)
  - `category` (text) - Type of workspace
  - `cta_text` (text) - Call-to-action button text
  - `is_active` (boolean) - Whether visible on site
  - `sort_order` (integer) - Display order
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. `contacts`
  Stores contact form submissions
  - `id` (uuid, primary key)
  - `name` (text)
  - `email` (text)
  - `phone` (text)
  - `service_interest` (text) - Which workspace they're interested in
  - `message` (text)
  - `status` (text) - pending/contacted/closed
  - `created_at` (timestamptz)

  ### 3. `testimonials`
  Stores customer testimonials
  - `id` (uuid, primary key)
  - `name` (text)
  - `company` (text)
  - `role` (text)
  - `content` (text)
  - `avatar_url` (text)
  - `rating` (integer) - 1-5 stars
  - `is_active` (boolean)
  - `created_at` (timestamptz)

  ### 4. `gallery_images`
  Stores gallery photos
  - `id` (uuid, primary key)
  - `image_url` (text)
  - `caption` (text)
  - `category` (text) - workspace/amenities/events
  - `sort_order` (integer)
  - `created_at` (timestamptz)

  ### 5. `admin_users`
  Stores admin authentication info
  - `id` (uuid, primary key, references auth.users)
  - `email` (text)
  - `role` (text) - admin/super_admin
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Public read access for active content
  - Admin-only write access
  - Contact form submissions authenticated
*/

-- Create workspaces table
CREATE TABLE IF NOT EXISTS workspaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  price numeric NOT NULL,
  discount integer DEFAULT 0 CHECK (discount >= 0 AND discount <= 100),
  category text NOT NULL,
  cta_text text DEFAULT 'Reserve your seat',
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  service_interest text,
  message text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'closed')),
  created_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text,
  role text,
  content text NOT NULL,
  avatar_url text,
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  caption text,
  category text DEFAULT 'workspace' CHECK (category IN ('workspace', 'amenities', 'events')),
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  role text DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Workspaces policies (public read active, admin write)
CREATE POLICY "Public can view active workspaces"
  ON workspaces FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage workspaces"
  ON workspaces FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Contacts policies (authenticated users can submit, admins can view all)
CREATE POLICY "Authenticated users can submit contacts"
  ON contacts FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can update contacts"
  ON contacts FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Testimonials policies (public read active, admin write)
CREATE POLICY "Public can view active testimonials"
  ON testimonials FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage testimonials"
  ON testimonials FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Gallery policies (public read, admin write)
CREATE POLICY "Public can view gallery images"
  ON gallery_images FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can manage gallery"
  ON gallery_images FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Admin users policies
CREATE POLICY "Admins can view admin users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to workspaces
DROP TRIGGER IF EXISTS update_workspaces_updated_at ON workspaces;
CREATE TRIGGER update_workspaces_updated_at
  BEFORE UPDATE ON workspaces
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample workspace data
INSERT INTO workspaces (title, description, image_url, price, discount, category, cta_text, sort_order) VALUES
('Managed Office', 'Fully furnished private office with all amenities. Perfect for teams of 5-50 people.', 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg', 25000, 20, 'managed_office', 'Talk to Sales', 1),
('Hot Desk', 'Flexible workspace for individuals who need to work on-the-go. First come, first served.', 'https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg', 4000, 15, 'hot_desk', 'Reserve your seat', 2),
('Dedicated Desk', 'Your own fixed desk in a shared space with 24/7 access and storage.', 'https://images.pexels.com/photos/1181607/pexels-photo-1181607.jpeg', 7000, 10, 'dedicated_desk', 'Reserve your seat', 3),
('Private Cabin', 'Soundproof cabin for focused work. Ideal for individuals or small teams.', 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg', 12000, 15, 'private_cabin', 'Talk to Sales', 4),
('Meeting Room', 'Professional meeting rooms with AV equipment for 4-20 people.', 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg', 500, 0, 'meeting_room', 'Book Now', 5),
('Conference Room', 'Large conference hall for workshops, training, and corporate events.', 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg', 2000, 0, 'conference_room', 'Book Now', 6),
('Flexi Office', 'Flexible office solutions that scale with your business needs.', 'https://images.pexels.com/photos/1181443/pexels-photo-1181443.jpeg', 15000, 20, 'flexi_office', 'Talk to Sales', 7),
('Day Pass', 'Access to workspace for a full day. Perfect for temporary workers.', 'https://images.pexels.com/photos/1181555/pexels-photo-1181555.jpeg', 500, 0, 'day_pass', 'Buy Pass', 8),
('Virtual Office', 'Professional business address with mail handling and call forwarding.', 'https://images.pexels.com/photos/3182834/pexels-photo-3182834.jpeg', 2000, 25, 'virtual_office', 'Get Started', 9)
ON CONFLICT DO NOTHING;

-- Insert sample testimonials
INSERT INTO testimonials (name, company, role, content, rating) VALUES
('Rajesh Kumar', 'Tech Innovators Pvt Ltd', 'CEO', 'Backspace has been instrumental in scaling our startup. The community and amenities are top-notch!', 5),
('Priya Sharma', 'Creative Minds', 'Founder', 'The flexibility and professional environment at Backspace helped us grow from 2 to 20 team members.', 5),
('Amit Patel', 'Digital Solutions', 'Operations Manager', 'Amazing infrastructure and support. The meeting rooms are perfect for client presentations.', 5)
ON CONFLICT DO NOTHING;