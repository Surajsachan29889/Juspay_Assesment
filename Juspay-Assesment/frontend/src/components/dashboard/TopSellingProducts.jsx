import React from 'react';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { motion } from 'framer-motion';

const products = [
  { name: 'ASOS Ridley High Waist', price: '$79.49', quantity: 82, amount: '$6,518.18' },
  { name: 'Marco Lightweight Shirt', price: '$128.50', quantity: 37, amount: '$4,754.50' },
  { name: 'Half Sleeve Shirt', price: '$39.99', quantity: 64, amount: '$2,559.36' },
  { name: 'Lightweight Jacket', price: '$20.00', quantity: 184, amount: '$3,680.00' },
  { name: 'Marco Shoes', price: '$79.49', quantity: 64, amount: '$1,965.81' },
];

export function TopSellingProducts() {
  return (
    <Card className="p-5 bg-card border border-border rounded-xl">
      <h3 className="text-sm font-semibold text-foreground mb-4">Top Selling Products</h3>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border">
            <TableHead className="text-xs text-muted-foreground font-medium h-8">Name</TableHead>
            <TableHead className="text-xs text-muted-foreground font-medium h-8">Price</TableHead>
            <TableHead className="text-xs text-muted-foreground font-medium h-8">Quantity</TableHead>
            <TableHead className="text-xs text-muted-foreground font-medium text-right h-8">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <motion.tr
              key={product.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border-border hover:bg-muted/50 transition-colors"
            >
              <TableCell className="text-sm text-foreground py-3">{product.name}</TableCell>
              <TableCell className="text-sm text-muted-foreground py-3">{product.price}</TableCell>
              <TableCell className="text-sm text-muted-foreground py-3">{product.quantity}</TableCell>
              <TableCell className="text-sm text-foreground font-medium py-3 text-right">{product.amount}</TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
