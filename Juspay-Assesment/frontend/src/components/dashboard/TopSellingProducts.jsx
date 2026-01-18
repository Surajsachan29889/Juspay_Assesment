import React, { memo } from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const products = [
  { name: 'ASOS Ridley High Waist', price: '$79.49', quantity: 82, amount: '$6,518.18' },
  { name: 'Marco Lightweight Shirt', price: '$128.50', quantity: 37, amount: '$4,754.50' },
  { name: 'Half Sleeve Shirt', price: '$39.99', quantity: 64, amount: '$2,559.36' },
  { name: 'Lightweight Jacket', price: '$20.00', quantity: 184, amount: '$3,680.00' },
  { name: 'Marco Shoes', price: '$79.49', quantity: 64, amount: '$1,965.81' },
  { name: 'Classic Denim Jeans', price: '$59.99', quantity: 120, amount: '$7,198.80' },
  { name: 'Wool Blend Coat', price: '$189.00', quantity: 28, amount: '$5,292.00' },
  { name: 'Cotton Polo T-Shirt', price: '$34.99', quantity: 95, amount: '$3,324.05' },
  { name: 'Leather Crossbody Bag', price: '$145.00', quantity: 42, amount: '$6,090.00' },
  { name: 'Running Sneakers', price: '$89.99', quantity: 76, amount: '$6,839.24' },
  { name: 'Slim Fit Chinos', price: '$64.50', quantity: 58, amount: '$3,741.00' },
  { name: 'Knit Sweater', price: '$72.00', quantity: 91, amount: '$6,552.00' },
  { name: 'Canvas Backpack', price: '$45.99', quantity: 134, amount: '$6,162.66' },
  { name: 'Silk Scarf', price: '$28.00', quantity: 167, amount: '$4,676.00' },
  { name: 'Linen Blazer', price: '$156.00', quantity: 35, amount: '$5,460.00' },
];

export const TopSellingProducts = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full flex-1 flex flex-col min-h-0"
    >
      <Card className="p-4 md:p-5 bg-card rounded-xl flex flex-col flex-1 min-h-0">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex-shrink-0">Top Selling Products</h3>
        <div className="overflow-auto h-[280px]">
          <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border sticky top-0 bg-card z-10">
            <TableHead className="text-xs text-muted-foreground font-medium h-8 bg-card">Name</TableHead>
            <TableHead className="text-xs text-muted-foreground font-medium h-8 bg-card">Price</TableHead>
            <TableHead className="text-xs text-muted-foreground font-medium h-8 bg-card">Quantity</TableHead>
            <TableHead className="text-xs text-muted-foreground font-medium text-right h-8 bg-card">Amount</TableHead>
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
        </div>
      </Card>
    </motion.div>
  );
});

TopSellingProducts.displayName = 'TopSellingProducts';
