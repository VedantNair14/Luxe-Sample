'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  Settings, 
  LogOut,
  Plus,
  Search,
  MoreVertical,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-neutral-100">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-8 flex flex-col hidden md:flex">
        <h2 className="text-2xl font-bold uppercase tracking-tighter mb-12">Luxe Admin</h2>
        <nav className="space-y-6 flex-1">
          <a href="#" className="flex items-center gap-4 text-sm font-medium hover:text-neutral-400 transition-colors uppercase tracking-widest text-white">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-4 text-sm font-medium hover:text-neutral-400 transition-colors uppercase tracking-widest text-neutral-500">
            <Package className="w-4 h-4" /> Products
          </a>
          <a href="#" className="flex items-center gap-4 text-sm font-medium hover:text-neutral-400 transition-colors uppercase tracking-widest text-neutral-500">
            <ShoppingCart className="w-4 h-4" /> Orders
          </a>
          <a href="#" className="flex items-center gap-4 text-sm font-medium hover:text-neutral-400 transition-colors uppercase tracking-widest text-neutral-500">
            <Users className="w-4 h-4" /> Customers
          </a>
          <a href="#" className="flex items-center gap-4 text-sm font-medium hover:text-neutral-400 transition-colors uppercase tracking-widest text-neutral-500">
            <Settings className="w-4 h-4" /> Settings
          </a>
        </nav>
        <button className="flex items-center gap-4 text-sm font-medium hover:text-red-400 transition-colors uppercase tracking-widest text-neutral-500 mt-auto">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-tighter">Dashboard Overview</h1>
            <p className="text-neutral-500 text-xs uppercase tracking-widest mt-1">Welcome back, Administrator</p>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Input placeholder="Search..." className="bg-white border-none rounded-none w-64 pl-10 text-xs uppercase tracking-widest h-12" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            </div>
            <Button className="bg-black text-white rounded-none uppercase tracking-widest px-6 h-12 flex gap-2">
              <Plus className="w-4 h-4" /> Add Product
            </Button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Revenue', value: '$128,430', change: '+12.5%', color: 'text-green-500' },
            { label: 'Active Orders', value: '42', change: '+3', color: 'text-blue-500' },
            { label: 'New Customers', value: '1,240', change: '+18%', color: 'text-green-500' },
            { label: 'Total Products', value: '156', change: '0', color: 'text-neutral-400' },
          ].map((stat, i) => (
            <Card key={i} className="rounded-none border-none shadow-sm">
              <CardContent className="p-6">
                <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2">{stat.label}</p>
                <div className="flex justify-between items-end">
                  <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
                  <span className={`text-[10px] font-bold ${stat.color}`}>{stat.change}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Orders Table */}
        <Card className="rounded-none border-none shadow-sm overflow-hidden">
          <CardHeader className="p-8 border-b border-neutral-100 flex flex-row justify-between items-center">
            <CardTitle className="text-sm font-bold uppercase tracking-widest">Recent Orders</CardTitle>
            <Button variant="ghost" className="text-[10px] uppercase tracking-widest p-0">View All <ChevronRight className="w-3 h-3 ml-1" /></Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-neutral-50 text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400">
                  <tr>
                    <th className="px-8 py-4">Order ID</th>
                    <th className="px-8 py-4">Customer</th>
                    <th className="px-8 py-4">Product</th>
                    <th className="px-8 py-4">Amount</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4">Date</th>
                    <th className="px-8 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {[1, 2, 3, 4, 5].map((order) => (
                    <tr key={order} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-8 py-6 text-sm font-bold">#ORD-{1000 + order}</td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">Customer {order}</span>
                          <span className="text-[10px] text-neutral-400">customer{order}@email.com</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm">Classic Black Overcoat</td>
                      <td className="px-8 py-6 text-sm font-bold">$299.99</td>
                      <td className="px-8 py-6">
                        <Badge className="bg-neutral-100 text-neutral-600 rounded-none uppercase text-[8px] tracking-widest border-none px-2 py-0.5">
                          Processing
                        </Badge>
                      </td>
                      <td className="px-8 py-6 text-sm text-neutral-500">Oct 24, 2026</td>
                      <td className="px-8 py-6">
                        <button className="p-2 hover:bg-white rounded-none border border-neutral-200 transition-all">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
