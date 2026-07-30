import { redirect } from 'next/navigation';

export default function RootPage() {
  // Jab bhi koi localhost:3000 par aayega, wo seedha login par chala jayenge
  redirect('/login');
}