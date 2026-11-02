import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import About from "@/components/About";
import { getI18n, isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { t, c } = getI18n(locale);
  void c;
  const title = `${c.bio.headline} | Yassine Aqejjaj`;
  const description = c.bio.paragraphs[0].slice(0, 200);
  const p = (l: string) => (l === "en" ? "/about" : `/${l}/about`);
  return { title, description, alternates: { canonical: p(locale), languages: { en: p("en"), fr: p("fr"), ar: p("ar") } }, openGraph: { title, description } };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const l = (await params).locale;
  if (!isLocale(l)) notFound();
  const locale: Locale = l;
  const { t, c, href } = getI18n(locale);
  void c; void href; void Link;
  return (
    <>
      <Header locale={locale} />
      <main>
        <About locale={locale} />
      </main>
    </>
  );
}
