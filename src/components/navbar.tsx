'use client';

import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Link,
} from '@heroui/react';
import { useState, useEffect } from 'react';
import { createSupabaseClient } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const menuItems = [
    'Documentation',
    'Pricing',
    'About',
    'Contact',
  ];

  useEffect(() => {
    const supabase = createSupabaseClient();
    
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <HeroNavbar onMenuOpenChange={setIsMenuOpen} className="bg-white/95 backdrop-blur-md border-b border-divider">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" color="foreground" className="font-bold text-xl">
            VibeContext
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/docs">
            Documentation
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/pricing">
            Pricing
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/about">
            About
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {loading ? (
          // Show loading state
          <NavbarItem>
            <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
          </NavbarItem>
        ) : user ? (
          // Show Dashboard button when logged in
          <NavbarItem>
            <Button 
              as={Link} 
              color="primary" 
              href="/dashboard" 
              variant="flat"
            >
              Dashboard
            </Button>
          </NavbarItem>
        ) : (
          // Show Login/Signup when not logged in
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/auth/login" color="foreground">
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button 
                as={Link} 
                color="primary" 
                href="/auth/signup" 
                variant="flat"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href={`/${item.toLowerCase().replace(' ', '-')}`}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
        {user ? (
          <NavbarMenuItem>
            <Link color="primary" href="/dashboard" size="lg">
              Dashboard
            </Link>
          </NavbarMenuItem>
        ) : (
          <>
            <NavbarMenuItem>
              <Link color="foreground" href="/auth/login" size="lg">
                Login
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link color="primary" href="/auth/signup" size="lg">
                Sign Up
              </Link>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </HeroNavbar>
  );
}