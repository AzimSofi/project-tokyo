interface MiniTableProps {
    Items: Item[];
};

interface Item {
    name: string;
    price: number;
    quantity: number;
    unit: string;
}

export function MiniTable({ Items }: MiniTableProps) {
    return (
        <table className="min-w-full border border-gray-200">
            <thead>
                <tr>
                    <th className="border px-1 py-1 font-medium text-gray-500">商品名</th>
                    <th className="border px-1 py-1 font-medium text-gray-500">価格</th>
                    <th className="border px-1 py-1 font-medium text-gray-500">数量</th>
                    <th className="border px-1 py-1 font-medium text-gray-500">単価</th>
                </tr>
            </thead>
            <tbody>
                {Items.map((item: Item, idx: number) => (
                    <tr key={idx}>
                        <td className="border px-1 py-1 text-center">{item.name}</td>
                        <td className="border px-1 py-1 text-center">{item.price}円</td>
                        <td className="border px-1 py-1 text-center">
                            {item.quantity} {item.unit}
                        </td>
                        <td className="border px-1 py-1 text-center">
                            {['個', '本', '玉'].includes(item.unit) && item.quantity != 1 ? Math.round(item.price / item.quantity) + '円' : '-'}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
