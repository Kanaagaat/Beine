import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/Card';

export default function PrivacyPage() {
  const t = useTranslations('privacy');

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          {t('title')}
        </h1>

        <Card>
          <div className="prose max-w-none">
            <p>{t('content')}</p>
            <p className="mt-4">
              Здесь будет размещена полная политика конфиденциальности с описанием
              того, как мы собираем, используем и защищаем персональные данные.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
