'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export function HomePageClient() {
  const t = useTranslations('home');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-accent to-brand-accentDark text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <Button variant="primary" size="lg">
                {t('hero.ctaPrimary')}
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white/20">
                {t('hero.ctaSecondary')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('howItWorks.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((step) => (
              <Card key={step} className="text-center">
                <div className="w-12 h-12 bg-brand-accent text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t(`howItWorks.step${step}.title`)}
                </h3>
                <p className="text-gray-600">
                  {t(`howItWorks.step${step}.description`)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('testimonials.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <Card key={i}>
                <p className="text-gray-700 mb-4 italic">
                  "{t(`testimonials.testimonial${i}.text`)}"
                </p>
                <p className="text-sm text-gray-500">
                  — {t(`testimonials.testimonial${i}.author`)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('faq.title')}
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <h3 className="font-semibold text-lg mb-2">
                  {t(`faq.q${i}`)}
                </h3>
                <p className="text-gray-600">
                  {t(`faq.a${i}`)}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
