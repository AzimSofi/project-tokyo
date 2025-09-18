import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { MiniTable } from './mini-table';
import { Button } from '@/components/ui/button';

interface Expense {
    id: number;
    date: string;
    total_amount: number;
    food_items_bought_in_bulk: FoodItemBoughtInBulk[];
    non_food_items: NonFoodItem[];
}

interface FoodItemBoughtInBulk {
    name: string;
    price: number;
    quantity: number;
    unit: string;
}

interface NonFoodItem {
    name: string;
    price: number;
    quantity: number;
    unit: string;
}

export default function ExpensesIndex() {
    const expenses = (usePage().props as any).expenses ?? [];

    return (
        <AppLayout breadcrumbs={[{ title: 'Expenses', href: '/expenses' }]}>
            <Head title="Expenses Index Page" />
            <Button
                className='ml-4'
                variant={'default'}
                size={'for-dashboard'}
                onClick={() => window.location.reload()}>
                追加
            </Button>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="px-4 py-2 text-left  font-medium text-gray-500">ID</th>
                                <th className="px-4 py-2 text-left  font-medium text-gray-500">日付</th>
                                <th className="px-4 py-2 text-left  font-medium text-gray-500">合計金額</th>
                                <th className="px-4 py-2 text-left  font-medium text-gray-500">食品まとめ買い</th>
                                <th className="px-4 py-2 text-left  font-medium text-gray-500">非食品まとめ買い</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200">
                            {expenses && expenses.length > 0 ? (
                                expenses.map((expense: Expense) => {
                                    const foodItems = typeof expense.food_items_bought_in_bulk === 'string'
                                        ? JSON.parse(expense.food_items_bought_in_bulk)
                                        : expense.food_items_bought_in_bulk;

                                    const nonFoodItems = typeof expense.non_food_items === 'string'
                                        ? JSON.parse(expense.non_food_items)
                                        : expense.non_food_items;

                                    return (
                                        <tr key={expense.id}>
                                            <td className="px-4 py-2">{expense.id}</td>
                                            <td className="px-4 py-2">{expense.date}</td>
                                            <td className="px-4 py-2">{expense.total_amount} 円</td>
                                            <td className="px-4 py-2">
                                                {Array.isArray(foodItems) && foodItems.length > 0 ? (
                                                    <MiniTable Items={foodItems} />
                                                ) : (
                                                    ''
                                                )}
                                            </td>
                                            <td className="px-4 py-2">
                                                {Array.isArray(nonFoodItems) && nonFoodItems.length > 0 ? (
                                                    <MiniTable Items={nonFoodItems} />
                                                ) : (
                                                    ''
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-4 py-2 text-center text-gray-400">データがありません</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
