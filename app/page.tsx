import Link from "next/link";
import { FileText, User, Settings } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="text-2xl font-bold text-center mb-8">
          Конструктор Договоров
        </h1>

        <div className="space-y-3">
          <Link
            href="/profile"
            className="flex items-center gap-4 p-4 bg-card rounded-lg border hover:bg-accent transition-colors"
          >
            <div className="p-2 bg-primary/10 rounded-lg">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold">Профиль</h2>
              <p className="text-sm text-muted-foreground">
                Управление реквизитами и подписью
              </p>
            </div>
          </Link>

          <Link
            href="/contract"
            className="flex items-center gap-4 p-4 bg-card rounded-lg border hover:bg-accent transition-colors"
          >
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold">Создать Договор</h2>
              <p className="text-sm text-muted-foreground">
                Конструктор и генерация PDF
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
