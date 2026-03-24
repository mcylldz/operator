import {
  Microscope,
  PiggyBank,
  Layers,
  LayoutDashboard,
  Fingerprint,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { StatItem, FeatureItem, TestimonialItem, BrandLogo, ProgramStep } from './types';

export const BRANDS: BrandLogo[] = [
  { name: 'Lamborghini', image: '/assets/brands/brand-2.png' },
  { name: 'Seedify', image: '/assets/brands/brand-3.png' },
  { name: 'WestWing', image: '/assets/brands/brand-4.png' },
  { name: 'Atasay', image: '/assets/brands/brand-5.png' },
  { name: 'Inkbox', image: '/assets/brands/brand-inkbox.png', className: 'h-5 md:h-7' }
];

export const STATS: StatItem[] = [
  { label: 'TOPLAM HACİM', value: '346.794.906', prefix: '₺', trend: 12 },
  { label: 'ORTALAMA SİPARİŞ TUTARI', value: '2.072', prefix: '₺', trend: 5 },
  { label: 'TOPLAM SİPARİŞ', value: '167.224', trend: 8 },
  { label: 'ORTALAMA ROAS', value: '4,61', trend: -2 }
];

export const FEATURES: FeatureItem[] = [
  {
    title: 'Ürün ve Pazar Araştırması',
    description: 'Kazanan ürünü nasıl bulduğumuzu ve neden seçtiğimizi kendi dökümantasyonlarımız üzerinden görün.',
    icon: <Microscope className="w-6 h-6 text-roasell-gold" />
  },
  {
    title: 'Teklif ve Marj Yönetimi',
    description: 'Kârlı bir operasyonun fiyatlandırmasını ve teklif yapısını gerçek rakamlarla öğrenin.',
    icon: <PiggyBank className="w-6 h-6 text-roasell-gold" />
  },
  {
    title: 'Operasyon Kurulumu',
    description: 'Şirket yapısından ödeme sistemlerine kadar operasyonun temellerini doğru kurun.',
    icon: <Layers className="w-6 h-6 text-roasell-gold" />
  },
  {
    title: 'Mağaza ve Dönüşüm',
    description: 'Gerçek mağazamızın nasıl kurgulandığını, hangi kararların alındığını adım adım görün.',
    icon: <LayoutDashboard className="w-6 h-6 text-roasell-gold" />
  },
  {
    title: 'Marka ve Sosyal Medya',
    description: 'Satışa optimize bir marka kimliğini ve sosyal medya varlığını nasıl kurduğumuzu öğrenin.',
    icon: <Fingerprint className="w-6 h-6 text-roasell-gold" />
  },
  {
    title: 'Reklam ve Ölçekleme',
    description: 'Sıfır dolar harcamadan günlük on bin dolar reklam bütçesine giden operasyonun reklam kararlarını canlı panelden izleyin.',
    icon: <TrendingUp className="w-6 h-6 text-roasell-gold" />
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'halil',
    name: 'Halil Bey',
    type: 'video',
    title: 'Halil Aydın Başarı Videosu',
    videoSrc: 'https://player.vimeo.com/video/1057536719?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479',
    platform: 'ROASELL'
  },
  {
    id: 'sude',
    name: 'Sude Hanım',
    type: 'video',
    title: 'Sude Hanım Başarı Hikayesi',
    videoSrc: 'https://player.vimeo.com/video/1057483311?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479',
    platform: 'ROASELL'
  },
  {
    id: 'oguzhan',
    name: 'Oğuzhan Bey',
    type: 'video',
    title: '82 Günde Marka Kurduk',
    videoSrc: 'https://www.youtube.com/embed/T4n_KuX1PwA?si=u0Xm7mRdqPpiKgi6',
    platform: 'ROASELL',
    resultValue: '₺703.919,78'
  },
  {
    id: 'efe',
    name: 'Efe',
    type: 'video',
    title: 'Trendyol\'dan Sonra Shopify',
    videoSrc: 'https://www.youtube.com/embed/EB_mM56p8MM?si=rA8rUsOtasFjM7m7',
    platform: 'ROASELL'
  },
  {
    id: 'rumeysa',
    name: 'Rümeysa Hanım',
    type: 'video',
    title: 'Rümeysa Hanım',
    videoSrc: 'https://player.vimeo.com/video/1057543862?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479',
    platform: 'ROASELL',
    resultValue: '1.000.000₺+'
  },
  {
    id: 'elxan',
    name: 'Elxan Bey',
    type: 'image',
    image: '/assets/testimonials/elxan-real.jpg',
    title: 'Elxan Bey Başarı Hikayesi'
  }
];

export const PROGRAM_STEPS: ProgramStep[] = [
  { day: 'Gün 1', title: 'Ürün araştırmaya başla' },
  { day: 'Gün 1', title: 'Bulduğun ürünleri listele (min 3 kriterlere uygun ürün)' },
  { day: 'Gün 2', title: 'Rakip analizi' },
  { day: 'Gün 2', title: 'Öncelik sıralaması' },
  { day: 'Gün 2', title: 'İlk ürünün Shopify mağazasını oluştur' },
  { day: 'Gün 2', title: 'Ürünle/nişle ilgili veya genel domain al' },
  { day: 'Gün 2', title: 'Roasell Temayı yükle' },
  { day: 'Gün 2', title: 'Ürünü ekle' },
  { day: 'Gün 2', title: 'Başabaş ROAS’ı hesaplayın' },
  { day: 'Gün 2', title: 'Satış fiyatını ayarlayın' },
  { day: 'Gün 2', title: 'Şirket kurulum işlerini başlatın' },
  { day: 'Gün 2', title: 'Tema rengini belirle' },
  { day: 'Gün 3', title: 'Logoyu üret / Düz yazı olabilir' },
  { day: 'Gün 3', title: 'Ürün görsellerini oluştur / Renk paletini kullan' },
  { day: 'Gün 3', title: 'Ürününüzün ana sayfasını hazırlamaya başlayın' },
  { day: 'Gün 3', title: 'Ürününüzün ürün sayfasını hazırlamaya başlayın' },
  { day: 'Gün 4', title: "Kaching bundles'ı kur / Teklifini oluştur" },
  { day: 'Gün 4', title: 'Yasal sayfaları ayarlayın' },
  { day: 'Gün 4', title: "Üst menü ve alt menü (footer)'yü ayarlayın" },
  { day: 'Gün 4', title: 'Ödeme altyapısını kurun' },
  { day: 'Gün 4', title: 'Mağazanın sosyal medya hesaplarını açın' },
  { day: 'Gün 4', title: 'Bio, isim ve website linki alanlarını doldurun' },
  { day: 'Gün 5', title: 'Instagram’da öne çıkanları tamamlayın' },
  { day: 'Gün 5', title: '“Sizden gelenler” bölümünü ayarla' },
  { day: 'Gün 6', title: 'Hedef kitle analizi ve Marketing Angles' },
  { day: 'Gün 6', title: 'Rakiplerinizdeki en az 2 haftadır çalışan kreatifleri toplayın' },
  { day: 'Gün 7', title: 'İşletme hesabınızın kurulumunu yapın' },
  { day: 'Gün 7', title: 'Reklam hesabınızın kurulumunu yapın' },
  { day: 'Gün 7', title: '“Instagram Accounts” kısmından Instagram hesabınızı bağlayın' },
  { day: 'Gün 7', title: '“Pages” kısmından Facebook sayfasını oluşturun' },
  { day: 'Gün 7', title: '“Varlık bağla” kısmından Instagram hesabınızı Facebook ile bağlayın' },
  { day: 'Gün 7', title: 'Piksel kurulumunu yapın' },
  { day: 'Gün 7', title: '“Data Sources” kısmından Pikselinizi oluşturun ve Shopify ile bağlayın' },
  { day: 'Gün 7', title: 'Reklamı yarın gece 00.00’da aktifleşecek şekilde yayınlayın' },
  { day: 'Gün 8', title: 'En az 3 kreatif daha üretin' },
  { day: 'Gün 8', title: 'Reklamlarınızı analiz edin' },
  { day: 'Gün 9', title: 'Ürünle/nişle ilgili veya genel domain al' },
  { day: 'Gün 9', title: 'Temayı yükle' },
  { day: 'Gün 9', title: 'Ürünü ekle' },
  { day: 'Gün 9', title: 'Break Even ROAS’ı hesaplayın' },
  { day: 'Gün 9', title: 'Satış fiyatını ayarlayın' },
  { day: 'Gün 9', title: 'Tema rengini belirle' },
  { day: 'Gün 10', title: 'Logoyu üret / Düz yazı olabilir' },
  { day: 'Gün 10', title: 'Ürün görsellerini oluştur / Renk paletini kullan' },
  { day: 'Gün 10', title: 'Ürününüzün ana sayfasını hazırlamaya başlayın' },
  { day: 'Gün 10', title: 'Ürününüzün ürün sayfasını hazırlamaya başlayın' },
  { day: 'Gün 11', title: "Kaching bundles'ı kur / Teklifini oluştur" },
  { day: 'Gün 11', title: 'Yasal sayfaları ayarlayın' },
  { day: 'Gün 11', title: "Üst menü ve alt menü (footer)'yü ayarlayın" },
  { day: 'Gün 11', title: 'Ödeme altyapısını kurun' },
  { day: 'Gün 11', title: 'Mağazanın sosyal medya hesaplarını açın' },
  { day: 'Gün 11', title: 'Bio, isim ve website linki alanlarını doldurun' },
  { day: 'Gün 12', title: 'Instagram’da öne çıkanları tamamlayın' },
  { day: 'Gün 12', title: '“Sizden gelenler” bölümü' },
  { day: 'Gün 12', title: '“Sipariş Ver” öne çıkan hikayesi koyun' },
  { day: 'Gün 12', title: 'Ürününüzle ilgili bir “Öne Çıkanlar” bölümü' },
  { day: 'Gün 13', title: 'Instagram hesabınıza takipçi satın alın (minimum 3.000)' },
  { day: 'Gün 13', title: 'Hedef kitle analizi ve Marketing Angles dökümanını hazırlayın' },
  { day: 'Gün 13', title: 'Yurt dışındaki rakiplerinizdeki en az 2 haftadır çalışan kreatifleri toplayın' },
  { day: 'Gün 13', title: 'Bu kreatifleri hedef pazarınızdaki dile çevirerek ilk kreatiflerinizi hazırlayın' },
  { day: 'Gün 14', title: '“Instagram Accounts” kısmından Instagram hesabınızı bağlayın' },
  { day: 'Gün 14', title: '“Pages” kısmından Facebook sayfasını oluşturun' },
  { day: 'Gün 14', title: '“Varlık bağla” kısmından Instagram hesabınızı Facebook ile bağlayın' },
  { day: 'Gün 14', title: 'Piksel kurulumunu yapın' },
  { day: 'Gün 14', title: '“Data Sources” kısmından Pikselinizi oluşturun ve Shopify ile bağlayın' },
  { day: 'Gün 14', title: 'Reklamı yarın gece 00.00’da aktifleşecek şekilde yayınlayın' },
  { day: 'Gün 15', title: 'En az 3 kreatif daha üretin' },
  { day: 'Gün 15', title: 'Reklamlarınızı analiz edin' }
];