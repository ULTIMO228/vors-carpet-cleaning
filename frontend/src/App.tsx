import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Icon, { BrandMark, type IconName } from "./components/Icon";
import { CleaningScene, MattressVisual, RugVisual } from "./components/Illustrations";

type Service = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  unit: string;
  category: string;
  tag: string;
  visual: "rug" | "sofa" | "mattress" | "delicate";
};
type Provider = {
  name: string;
  owner: string;
  rating: string;
  orders: string;
  experience: string;
  color: string;
  initials: string;
};
type Modal = "login" | "profile" | "providers" | "service" | "cart" | "booking" | "success" | null;
const services: Service[] = [
  {
    id: "rug",
    name: "Чистка ковров",
    subtitle: "Вернём мягкость и яркость красок",
    price: 290,
    unit: "м²",
    category: "Ковры",
    tag: "Самое популярное",
    visual: "rug",
  },
  {
    id: "sofa",
    name: "Чистка мягкой мебели",
    subtitle: "Любимое место снова как новое",
    price: 1490,
    unit: "место",
    category: "Мебель",
    tag: "С выездом на дом",
    visual: "sofa",
  },
  {
    id: "mattress",
    name: "Чистка матрасов",
    subtitle: "Для по-настоящему здорового сна",
    price: 1290,
    unit: "шт.",
    category: "Мебель",
    tag: "Глубокая очистка",
    visual: "mattress",
  },
  {
    id: "delicate",
    name: "Деликатная чистка",
    subtitle: "Особая забота о шерсти и шёлке",
    price: 450,
    unit: "м²",
    category: "Деликатные ткани",
    tag: "Бережный уход",
    visual: "delicate",
  },
];
const providers: Provider[] = [
  {
    name: "Чисто & мягко",
    owner: "ИП Алексей Смирнов",
    rating: "4.9",
    orders: "248",
    experience: "7 лет заботы о ваших коврах",
    color: "#e1e9dc",
    initials: "АС",
  },
  {
    name: "Дом свежести",
    owner: "ИП Мария Волкова",
    rating: "5.0",
    orders: "186",
    experience: "Эко-средства и бережный подход",
    color: "#ece3d8",
    initials: "МВ",
  },
  {
    name: "Новый ворс",
    owner: "ИП Дмитрий Соколов",
    rating: "4.8",
    orders: "312",
    experience: "Сложные пятна — наша работа",
    color: "#dde5e9",
    initials: "ДС",
  },
];
const formatPrice = (value: number) => new Intl.NumberFormat("ru-RU").format(value);
const materials = [
  { name: "Синтетика", price: 290 },
  { name: "Шерсть", price: 390 },
  { name: "Шёлк", price: 590 },
];
const products = [
  { name: "Бережная", label: "Для каждого дня", icon: "drop", extra: 0 },
  { name: "Эко-средства", label: "Дети и питомцы", icon: "leaf", extra: 70 },
  { name: "Глубокая", label: "Сложные пятна", icon: "sparkle", extra: 110 },
] as const;

function ServiceVisual({ visual }: { visual: Service["visual"] }) {
  if (visual === "rug") return <RugVisual compact />;
  if (visual === "mattress") return <MattressVisual />;
  if (visual === "sofa")
    return <img src="/images/sofa.jpg" alt="Светлый диван в уютном интерьере" loading="lazy" />;
  return (
    <img
      src="/images/rug-texture.jpg"
      alt="Фактура натурального ковра крупным планом"
      loading="lazy"
    />
  );
}

function ModalWindow({
  children,
  title,
  onClose,
  wide = false,
}: {
  children: ReactNode;
  title: string;
  onClose: () => void;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const elements = ref.current?.querySelectorAll<HTMLElement>(
          'button:not(:disabled), input, select, textarea, a[href], [tabindex="0"]',
        );
        if (!elements?.length) return;
        const first = elements[0],
          last = elements[elements.length - 1];
        if (
          event.shiftKey &&
          (document.activeElement === first || document.activeElement === ref.current)
        ) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [onClose]);
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={`modal ${wide ? "modal-wide" : ""}`}
      >
        <button className="icon-button modal-close" onClick={onClose} aria-label="Закрыть">
          <Icon name="close" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const [city, setCity] = useState("Казань");
  const [citiesOpen, setCitiesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [clean, setClean] = useState(true);
  const [filter, setFilter] = useState("Все услуги");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [modal, setModal] = useState<Modal>(null);
  const [selectedService, setSelectedService] = useState<Service>(services[0]);
  const [cart, setCart] = useState<{ service: Service; quantity: number; price: number }[]>([]);
  const [material, setMaterial] = useState(0);
  const [area, setArea] = useState(6);
  const [dirt, setDirt] = useState(45);
  const [product, setProduct] = useState(0);
  const [provider, setProvider] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [toast, setToast] = useState("");
  const [bookingSource, setBookingSource] = useState<"calculator" | "cart">("calculator");
  const [serviceQuantity, setServiceQuantity] = useState(1);
  const closeModal = useRef(() => setModal(null)).current;
  const dirtName = dirt < 34 ? "Лёгкая" : dirt < 68 ? "Средняя" : "Сильная";
  const unitPrice =
    materials[material].price + products[product].extra + (dirt < 34 ? 0 : dirt < 68 ? 50 : 100);
  const estimate = area * unitPrice;
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = bookingSource === "cart" ? cartTotal : estimate;

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3500);
    return () => clearTimeout(timer);
  }, [toast]);
  const openService = (service: Service) => {
    setSelectedService(service);
    setServiceQuantity(service.id === "rug" || service.id === "delicate" ? 6 : 1);
    setModal("service");
  };
  const addToCart = () => {
    setCart((items) => {
      const existing = items.find((item) => item.service.id === selectedService.id);
      return existing
        ? items.map((item) =>
            item.service.id === selectedService.id
              ? { ...item, quantity: item.quantity + serviceQuantity }
              : item,
          )
        : [
            ...items,
            { service: selectedService, quantity: serviceQuantity, price: selectedService.price },
          ];
    });
    setModal(null);
    setToast("Услуга добавлена в ваш заказ");
  };
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  const openBooking = (source: "calculator" | "cart") => {
    setBookingSource(source);
    setModal("booking");
  };

  return (
    <div className="app">
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#" aria-label="Ворс — на главную">
            <BrandMark />
            <span>
              ворс<span className="brand-dot">.</span>
            </span>
          </a>
          <nav
            className={menuOpen ? "main-nav is-open" : "main-nav"}
            aria-label="Главная навигация"
          >
            <a href="#services" onClick={() => setMenuOpen(false)}>
              Услуги
            </a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
              Как это работает
            </a>
            <a href="#masters" onClick={() => setMenuOpen(false)}>
              Наши мастера
            </a>
            <a href="#reviews" onClick={() => setMenuOpen(false)}>
              Отзывы
            </a>
          </nav>
          <div className="header-actions">
            <div className="city-picker">
              <button
                className="city-button"
                aria-expanded={citiesOpen}
                onClick={() => setCitiesOpen(!citiesOpen)}
              >
                <Icon name="pin" size={17} />
                <span>{city}</span>
                <Icon name="chevron" size={15} />
              </button>
              {citiesOpen && (
                <div className="city-menu">
                  {["Казань", "Москва", "Санкт-Петербург", "Нижний Новгород"].map((item) => (
                    <button
                      key={item}
                      className={city === item ? "selected" : ""}
                      onClick={() => {
                        setCity(item);
                        setCitiesOpen(false);
                      }}
                    >
                      {item}
                      {city === item && <Icon name="check" size={16} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              className="login-button"
              onClick={() => setModal(loggedIn ? "profile" : "login")}
            >
              <Icon name="user" size={17} />
              <span>{loggedIn ? "Мой профиль" : "Войти"}</span>
            </button>
            <button
              className="icon-button cart-button"
              aria-label={`Заказ, услуг: ${cart.length}`}
              onClick={() => setModal("cart")}
            >
              <Icon name="bag" size={21} />
              {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </button>
            <button
              className="icon-button mobile-menu"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Открыть меню"
              aria-expanded={menuOpen}
            >
              <Icon name={menuOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero container">
          <div className="hero-art">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-label">
              <span className="status-dot" />
              Немного магии. Много чистоты.
            </div>
            <CleaningScene clean={clean} />
            <div className="art-review">
              <div className="art-review-icon">
                <Icon name="sparkle" size={21} />
              </div>
              <div>
                <strong>Снова как новенький</strong>
                <span>И даже чуточку мягче</span>
              </div>
              <Icon name="check" size={16} />
            </div>
            <div className="art-toggle" aria-label="Визуализация результата">
              <button onClick={() => setClean(false)} className={!clean ? "active" : ""}>
                До чистки
              </button>
              <button onClick={() => setClean(true)} className={clean ? "active" : ""}>
                После <Icon name="sparkle" size={13} />
              </button>
            </div>
            <span className="art-caption">Чистоту можно почувствовать</span>
          </div>
          <div className="hero-copy">
            <div className="eyebrow">
              <span />
              БОЛЬШЕ, ЧЕМ ПРОСТО ЧИСТКА
            </div>
            <h1>
              Чистый ковёр.
              <br />
              <span>Свежая история.</span>
            </h1>
            <p className="hero-description">
              Вернём вашему ковру мягкость, цвет и ощущение
              <br className="desktop-break" /> нового. А дому — уют, в который хочется вернуться.
            </p>
            <div className="hero-buttons">
              <button className="button button-primary" onClick={() => scrollTo("calculator")}>
                Рассчитать стоимость <Icon name="arrow" size={19} />
              </button>
              <button className="video-button" onClick={() => scrollTo("how-it-works")}>
                <span>
                  <Icon name="play" size={14} />
                </span>
                Как мы работаем
              </button>
            </div>
            <div className="hero-social">
              <div className="avatar-stack">
                <span>АК</span>
                <span>МВ</span>
                <span>ДС</span>
                <span>+1k</span>
              </div>
              <div className="social-copy">
                <div>
                  <Icon name="star" size={14} />
                  <strong>4.9</strong>
                  <span>из 5 на основе 320+ отзывов</span>
                </div>
                <p>Уже 1 200 ковров снова радуют своих хозяев</p>
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          <section className="benefits" aria-label="Преимущества">
            {(
              [
                {
                  icon: "truck",
                  title: "Заберём и привезём",
                  text: "Бесплатно при заказе от 2 500 ₽",
                },
                {
                  icon: "leaf",
                  title: "Безопасно для всех",
                  text: "Для детей, питомцев и планеты",
                },
                {
                  icon: "shield",
                  title: "Мастера с гарантией",
                  text: "Проверенные ИП, честные отзывы",
                },
                {
                  icon: "sparkle",
                  title: "Чистота без сюрпризов",
                  text: "Стоимость известна заранее",
                },
              ] as { icon: IconName; title: string; text: string }[]
            ).map((item) => (
              <div className="benefit" key={item.title}>
                <span className="benefit-icon">
                  <Icon name={item.icon} size={27} />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </section>
        </div>

        <section className="section services-section container" id="services">
          <div className="section-heading">
            <div>
              <div className="eyebrow">ЗАБОТА О КАЖДОЙ ДЕТАЛИ</div>
              <h2>
                У каждой вещи — свой подход<span className="green-dot">.</span>
              </h2>
            </div>
            <p>
              От любимого ковра до уютного дивана.
              <br />
              Выберите то, о чём позаботимся сегодня.
            </p>
          </div>
          <div className="filter-tabs" aria-label="Категории услуг">
            {["Все услуги", "Ковры", "Мебель", "Деликатные ткани"].map((item) => (
              <button
                key={item}
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
              >
                {item}
                {item === "Все услуги" && <span>4</span>}
              </button>
            ))}
          </div>
          <div className="service-grid">
            {services
              .filter((service) => filter === "Все услуги" || service.category === filter)
              .map((service) => (
                <article className="service-card" key={service.id}>
                  <div className={`service-image service-image-${service.visual}`}>
                    <button
                      className="service-image-button"
                      onClick={() => openService(service)}
                      aria-label={`Подробнее: ${service.name}`}
                    >
                      <ServiceVisual visual={service.visual} />
                    </button>
                    <span className="service-tag">{service.tag}</span>
                    <button
                      className={`favorite-button ${favorites.includes(service.id) ? "is-favorite" : ""}`}
                      onClick={() =>
                        setFavorites(
                          favorites.includes(service.id)
                            ? favorites.filter((id) => id !== service.id)
                            : [...favorites, service.id],
                        )
                      }
                      aria-label={
                        favorites.includes(service.id)
                          ? "Убрать из избранного"
                          : "Добавить в избранное"
                      }
                      aria-pressed={favorites.includes(service.id)}
                    >
                      <Icon name="heart" size={18} />
                    </button>
                  </div>
                  <button className="service-title" onClick={() => openService(service)}>
                    {service.name}
                  </button>
                  <p className="service-subtitle">{service.subtitle}</p>
                  <div className="service-bottom">
                    <span>
                      от <strong>{formatPrice(service.price)} ₽</strong>
                      <span> / {service.unit}</span>
                    </span>
                    <button
                      className="round-arrow"
                      aria-label={`Выбрать: ${service.name}`}
                      onClick={() => openService(service)}
                    >
                      <Icon name="arrow-up" size={19} />
                    </button>
                  </div>
                </article>
              ))}
          </div>
        </section>

        <section className="calculator-section" id="calculator">
          <div className="container">
            <div className="section-heading">
              <div>
                <div className="eyebrow">ВАШ КОВЁР. ВАШИ ПРАВИЛА.</div>
                <h2>
                  Почувствуйте разницу.
                  <br />
                  Узнайте стоимость.
                </h2>
              </div>
              <p>
                Никаких «от» и мелкого шрифта.
                <br />
                Настройте чистку под свой ковёр.
              </p>
            </div>
            <div className="calculator">
              <div className="calculator-preview">
                <div className="preview-top">
                  <span>
                    <span className="status-dot" />
                    ВАШ КОВЁР В РЕАЛЬНОМ ВРЕМЕНИ
                  </span>
                  <Icon name="sparkle" size={21} />
                </div>
                <div className="calculator-rug">
                  <RugVisual dirt={dirt} />
                  <span className="rug-size">{area} м²</span>
                  <span className="rug-material">{materials[material].name}</span>
                </div>
                <div className="dirt-control">
                  <div className="control-label">
                    <label htmlFor="dirt-slider">Насколько он устал?</label>
                    <span className="dirt-level">{dirtName} загрязнённость</span>
                  </div>
                  <div className="dirt-range-wrap">
                    <input
                      aria-label="Степень загрязнения"
                      id="dirt-slider"
                      type="range"
                      min="0"
                      max="100"
                      value={dirt}
                      onChange={(event) => setDirt(Number(event.target.value))}
                      style={{ "--range-progress": `${dirt}%` } as CSSProperties}
                    />
                  </div>
                  <div className="range-labels">
                    <span>Немного освежить</span>
                    <span>Нужна магия</span>
                  </div>
                </div>
                <p className="preview-note">
                  <Icon name="sparkle" size={15} /> Двигайте ползунок — ковёр всё покажет
                </p>
              </div>
              <div className="calculator-settings">
                <div className="setting-heading">
                  <h3>Соберём идеальную чистку</h3>
                  <Icon name="sparkle" size={17} className="text-[#9aaa88]" />
                </div>
                <div className="setting">
                  <label>Материал ковра</label>
                  <div className="segmented">
                    {materials.map((item, index) => (
                      <button
                        className={material === index ? "active" : ""}
                        key={item.name}
                        onClick={() => setMaterial(index)}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="setting area-setting">
                  <div>
                    <label htmlFor="area-input">Площадь ковра</label>
                    <p>Например, 2 × 3 м = 6 м²</p>
                  </div>
                  <div className="number-stepper">
                    <button
                      onClick={() => setArea(Math.max(1, area - 1))}
                      disabled={area <= 1}
                      aria-label="Уменьшить площадь"
                    >
                      <Icon name="minus" size={16} />
                    </button>
                    <div>
                      <input
                        id="area-input"
                        type="number"
                        min="1"
                        max="100"
                        value={area}
                        onChange={(event) =>
                          setArea(Math.min(100, Math.max(1, Number(event.target.value) || 1)))
                        }
                      />
                      <span>м²</span>
                    </div>
                    <button
                      onClick={() => setArea(Math.min(100, area + 1))}
                      disabled={area >= 100}
                      aria-label="Увеличить площадь"
                    >
                      <Icon name="plus" size={16} />
                    </button>
                  </div>
                </div>
                <div className="setting">
                  <label>Чем будем чистить?</label>
                  <div className="product-options">
                    {products.map((item, index) => (
                      <button
                        key={item.name}
                        className={product === index ? "active" : ""}
                        onClick={() => setProduct(index)}
                      >
                        <span className="product-check">
                          {product === index && <Icon name="check" size={10} />}
                        </span>
                        <Icon name={item.icon} size={23} />
                        <strong>{item.name}</strong>
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="quote-provider">
                  <div className="provider-mini" style={{ background: providers[provider].color }}>
                    {providers[provider].initials}
                  </div>
                  <div>
                    <span>Ваш мастер</span>
                    <strong>
                      {providers[provider].name} <Icon name="star" size={12} />{" "}
                      {providers[provider].rating}
                    </strong>
                  </div>
                  <button onClick={() => setModal("providers")}>
                    Выбрать <Icon name="chevron" size={15} />
                  </button>
                </div>
                <div className="quote-total">
                  <div>
                    <span>Стоимость чистки</span>
                    <strong>
                      {formatPrice(estimate)} <span>₽</span>
                    </strong>
                  </div>
                  <div className="quote-details">
                    {area} м² × {unitPrice} ₽
                    <span>
                      <Icon name="check" size={13} /> Без скрытых доплат
                    </span>
                  </div>
                </div>
                <button
                  className="button button-primary full-width"
                  onClick={() => openBooking("calculator")}
                >
                  Подарить ковру новую жизнь <Icon name="arrow" size={19} />
                </button>
                <p className="quote-note">
                  Доставка {estimate >= 2500 ? "бесплатно" : "— 390 ₽. Бесплатно от 2 500 ₽"}.
                  Оплата после результата.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section process-section container" id="how-it-works">
          <div className="section-heading">
            <div>
              <div className="eyebrow">ВСЁ ПРОЗРАЧНО. ВСЁ ПО-ЧЕЛОВЕЧЕСКИ.</div>
              <h2>
                От «пора бы почистить»
                <br />
                до «какой же он мягкий!»
              </h2>
            </div>
            <p>
              Вы отдыхаете. Мы делаем то,
              <br />
              что любим и умеем.
            </p>
          </div>
          <div className="process-layout">
            <div className="process-art">
              <CleaningScene clean={activeStep >= 2} />
              <div className="process-caption">
                <span className="status-dot" />
                {
                  [
                    "Знакомимся с вашим ковром",
                    "У каждого пятна — свой подход",
                    "Чистота на всю глубину ворса",
                    "Готов к новым уютным вечерам",
                  ][activeStep]
                }
              </div>
            </div>
            <div className="process-steps">
              {[
                {
                  title: "Знакомимся и забираем",
                  text: "Вы выбираете мастера и удобное время. Мы приезжаем и бережно забираем ковёр.",
                  icon: "truck",
                },
                {
                  title: "Подбираем особый подход",
                  text: "Определяем материал, изучаем пятна и выбираем безопасные средства.",
                  icon: "leaf",
                },
                {
                  title: "Чистим до самой основы",
                  text: "Удаляем пыль, пятна и запахи. Промываем чистой водой и сушим в специальной камере.",
                  icon: "wash",
                },
                {
                  title: "Возвращаем уют домой",
                  text: "Привозим сухой и свежий ковёр. Вы проверяете результат — и только потом оплачиваете.",
                  icon: "heart",
                },
              ].map((step, index) => (
                <button
                  key={step.title}
                  className={`process-step ${activeStep === index ? "active" : ""}`}
                  onClick={() => setActiveStep(index)}
                  aria-expanded={activeStep === index}
                >
                  <span className="step-number">0{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    {activeStep === index && <p>{step.text}</p>}
                  </div>
                  <Icon name={step.icon as IconName} size={23} />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="masters-section section" id="masters">
          <div className="container">
            <div className="section-heading">
              <div>
                <div className="eyebrow">НЕ БЕЗЛИКИЙ СЕРВИС. СВОЙ МАСТЕР.</div>
                <h2>Люди, которым можно доверить.</h2>
              </div>
              <span className="verified-label">
                <Icon name="shield" size={17} /> Все мастера проверены
              </span>
            </div>
            <div className="masters-grid">
              {providers.map((item, index) => (
                <article
                  className={`master-card ${provider === index ? "selected" : ""}`}
                  key={item.name}
                >
                  <div className="master-top">
                    <div className="master-avatar" style={{ background: item.color }}>
                      {item.initials}
                      <span>
                        <Icon name="check" size={11} />
                      </span>
                    </div>
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.owner}</p>
                    </div>
                    <span className="master-rating">
                      <Icon name="star" size={14} />
                      {item.rating}
                    </span>
                  </div>
                  <p className="master-description">{item.experience}</p>
                  <div className="master-stats">
                    <span>
                      <strong>{item.orders}</strong> выполненных заказов
                    </span>
                    <span>
                      <Icon name="pin" size={13} /> {city}
                    </span>
                  </div>
                  <button
                    className={`button ${provider === index ? "button-selected" : "button-outline"}`}
                    onClick={() => {
                      setProvider(index);
                      setToast(`Ваш мастер — ${item.name}`);
                    }}
                  >
                    {provider === index ? (
                      <>
                        <Icon name="check" size={17} /> Ваш мастер
                      </>
                    ) : (
                      <>
                        Выбрать мастера <Icon name="arrow" size={17} />
                      </>
                    )}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section reviews-section container" id="reviews">
          <div className="section-heading">
            <div>
              <div className="eyebrow">СЛОВА, КОТОРЫЕ ГРЕЮТ</div>
              <h2>Чистые ковры. Счастливые люди.</h2>
            </div>
            <div className="review-rating">
              <Icon name="star" size={24} />
              <strong>4.9</strong>
              <span>
                320+ добрых отзывов
                <br />
                <small>Демонстрационные отзывы</small>
              </span>
            </div>
          </div>
          <div className="reviews-grid">
            {[
              {
                name: "Анна К.",
                text: "Думала, что любимый ковёр уже не спасти после щенка. Вернули как новый! Никаких запахов, мягкий-мягкий. И забирать никуда не пришлось.",
                type: "Чистка ковра · 6 м²",
                date: "12 октября",
                bg: "#e8e0d5",
              },
              {
                name: "Михаил Р.",
                text: "Очень понравилось, что сразу видна цена и можно выбрать мастера. Алексей всё объяснил, приехал вовремя. Диван снова светлый, спасибо!",
                type: "Чистка дивана · 3 места",
                date: "8 октября",
                bg: "#e0e7db",
              },
              {
                name: "Елена С.",
                text: "Выбрала эко-чистку — дома маленький ребёнок. Ковёр чистый, никаких резких запахов. Приятно, когда о твоих вещах так заботятся.",
                type: "Эко-чистка ковра · 8 м²",
                date: "5 октября",
                bg: "#e9dfd9",
              },
            ].map((review) => (
              <article className="review-card" key={review.name}>
                <div className="review-stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Icon name="star" size={14} key={i} />
                  ))}
                  <span>{review.date}</span>
                </div>
                <blockquote>«{review.text}»</blockquote>
                <div className="review-person">
                  <span style={{ background: review.bg }}>{review.name.slice(0, 1)}</span>
                  <div>
                    <strong>{review.name}</strong>
                    <p>{review.type}</p>
                  </div>
                  <Icon name="check" size={16} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="faq-section section container">
          <div>
            <div className="eyebrow">ПАРА СЛОВ О ВАЖНОМ</div>
            <h2>Остались вопросы?</h2>
            <p>
              У чистоты не должно быть секретов.
              <br />
              Рассказываем всё как есть.
            </p>
            <a className="text-link" href="mailto:hello@vors.example">
              Написать нам <Icon name="arrow" size={18} />
            </a>
            <small className="demo-contact-note">Контакт для демонстрации</small>
          </div>
          <div className="faq-list">
            {[
              {
                q: "Сколько времени занимает чистка?",
                a: "Обычно 3–5 дней: бережная чистка, тщательная сушка и доставка обратно. Точное время мастер согласует с вами перед оформлением.",
              },
              {
                q: "Средства безопасны для детей и животных?",
                a: "Да. Мы используем профессиональные средства, которые полностью вымываются из ворса. Для самых чувствительных можно выбрать эко-чистку без отдушек.",
              },
              {
                q: "А если пятно не отмоется?",
                a: "Мастер заранее оценит сложные пятна и расскажет о возможном результате. Мы не обещаем невозможного: некоторые старые пятна меняют саму структуру волокна.",
              },
              {
                q: "Как происходит оплата?",
                a: "После возвращения ковра и проверки результата. В этом демонстрационном приложении оплата и настоящие заказы не выполняются.",
              },
            ].map((item, index) => (
              <div className={`faq-item ${activeFaq === index ? "active" : ""}`} key={item.q}>
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  aria-expanded={activeFaq === index}
                >
                  {item.q}
                  <Icon name={activeFaq === index ? "minus" : "plus"} size={19} />
                </button>
                {activeFaq === index && <p>{item.a}</p>}
              </div>
            ))}
          </div>
        </section>
        <section className="bottom-cta container">
          <div>
            <span className="eyebrow">ДОМ НАЧИНАЕТСЯ С ОЩУЩЕНИЙ</span>
            <h2>Пусть дома будет хорошо.</h2>
            <p>А о чистоте мы позаботимся.</p>
          </div>
          <button className="button button-light" onClick={() => scrollTo("calculator")}>
            Начнём с вашего ковра <Icon name="arrow" size={19} />
          </button>
          <BrandMark size={210} />
        </section>
      </main>
      <footer className="container footer">
        <div className="footer-top">
          <a className="brand" href="#">
            <BrandMark size={28} />
            <span>ворс.</span>
          </a>
          <p>Чистота с человеческим подходом.</p>
          <a href="#services">Услуги</a>
          <a href="#masters">Мастера</a>
          <a href="#how-it-works">Как это работает</a>
          <button onClick={() => setModal(loggedIn ? "profile" : "login")}>
            Личный кабинет <Icon name="arrow-up" size={15} />
          </button>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Ворс. С заботой о вашем доме.</span>
          <span>Демонстрационный магазин · Все данные вымышлены</span>
        </div>
      </footer>

      {toast && (
        <div className="toast" role="status">
          <Icon name="check" size={19} />
          {toast}
        </div>
      )}

      {modal && (
        <ModalWindow
          title={
            {
              login: "Вход в личный кабинет",
              profile: "Мой профиль",
              providers: "Выберите своего мастера",
              service: selectedService.name,
              cart: "Ваш заказ",
              booking: "Оформление заказа",
              success: "Демонстрационный заказ оформлен",
            }[modal]
          }
          onClose={closeModal}
          wide={modal === "service" || modal === "providers"}
        >
          {modal === "login" && (
            <div className="login-content">
              <div className="modal-brand">
                <BrandMark size={42} />
              </div>
              <div className="eyebrow">РАДЫ ВАС ВИДЕТЬ</div>
              <h2>Уют начинается здесь.</h2>
              <p className="modal-description">
                Войдите, чтобы ваши любимые мастера
                <br />и заказы всегда были под рукой.
              </p>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setLoggedIn(true);
                  setModal("profile");
                  setToast("Вы вошли в демо-профиль");
                }}
              >
                <label className="form-label" htmlFor="login-phone">
                  Ваш телефон
                </label>
                <input
                  className="form-input"
                  id="login-phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                  pattern="[+0-9 ()-]{10,20}"
                  autoComplete="tel"
                />
                <button className="button button-primary full-width" type="submit">
                  Войти в демо-режиме <Icon name="arrow" size={18} />
                </button>
              </form>
              <p className="demo-notice">
                <Icon name="shield" size={16} />
                Это пример интерфейса. SMS не отправляется,
                <br />
                номер нигде не сохраняется.
              </p>
            </div>
          )}
          {modal === "profile" && (
            <>
              <div className="eyebrow">ЛИЧНЫЙ КАБИНЕТ</div>
              <h2>Добро пожаловать{name ? `, ${name}` : ""}.</h2>
              <p className="modal-description">Ваш демонстрационный профиль</p>
              <div className="profile-card">
                <span className="profile-avatar">
                  <Icon name="user" size={28} />
                </span>
                <div>
                  <strong>{phone || "Гость"}</strong>
                  <p>Демо-аккаунт · {city}</p>
                </div>
              </div>
              <div className="profile-stat">
                <span>Избранных услуг</span>
                <strong>{favorites.length}</strong>
              </div>
              <div className="profile-stat">
                <span>Услуг в заказе</span>
                <strong>{cart.length}</strong>
              </div>
              <button className="button button-primary full-width" onClick={() => setModal("cart")}>
                Перейти к заказу <Icon name="arrow" size={18} />
              </button>
              <button
                className="logout-button"
                onClick={() => {
                  setLoggedIn(false);
                  setModal(null);
                  setPhone("");
                }}
              >
                Выйти из демо-профиля
              </button>
            </>
          )}
          {modal === "providers" && (
            <>
              <div className="eyebrow">ХОРОШАЯ ЧИСТКА НАЧИНАЕТСЯ С ЧЕЛОВЕКА</div>
              <h2>Выберите своего мастера.</h2>
              <p className="modal-description">
                Проверенные исполнители в городе {city}. Цена расчёта не изменится.
              </p>
              <div className="provider-options">
                {providers.map((item, index) => (
                  <button
                    key={item.name}
                    className={`provider-option ${provider === index ? "active" : ""}`}
                    onClick={() => setProvider(index)}
                  >
                    <div className="master-avatar" style={{ background: item.color }}>
                      {item.initials}
                    </div>
                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.owner}</span>
                      <p>{item.experience}</p>
                    </div>
                    <div className="provider-option-right">
                      <span>
                        <Icon name="star" size={14} />
                        {item.rating}
                      </span>
                      <span className="radio-circle">
                        {provider === index && <Icon name="check" size={13} />}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              <button
                className="button button-primary full-width"
                onClick={() => {
                  setModal(null);
                  setToast(`Выбран мастер «${providers[provider].name}»`);
                }}
              >
                Выбрать «{providers[provider].name}» <Icon name="check" size={18} />
              </button>
            </>
          )}
          {modal === "service" && (
            <div className="service-modal-layout">
              <div className={`service-modal-visual service-image-${selectedService.visual}`}>
                <ServiceVisual visual={selectedService.visual} />
                <span className="service-modal-badge">
                  <Icon name="shield" size={16} /> Бережная чистка с гарантией
                </span>
              </div>
              <div className="service-modal-copy">
                <div className="eyebrow">ЗАБОТА, КОТОРАЯ ВИДНА</div>
                <h2>{selectedService.name}</h2>
                <p className="modal-description">
                  {selectedService.subtitle}. Подберём средства под материал и тип загрязнений.
                </p>
                <ul className="service-includes">
                  <li>
                    <Icon name="check" size={16} />
                    Удаление пыли, пятен и запахов
                  </li>
                  <li>
                    <Icon name="check" size={16} />
                    Профессиональные безопасные средства
                  </li>
                  <li>
                    <Icon name="check" size={16} />
                    Проверка результата перед оплатой
                  </li>
                </ul>
                <div className="modal-quantity">
                  <span>Количество, {selectedService.unit}</span>
                  <div className="number-stepper">
                    <button
                      onClick={() => setServiceQuantity(Math.max(1, serviceQuantity - 1))}
                      disabled={serviceQuantity <= 1}
                      aria-label="Уменьшить количество"
                    >
                      <Icon name="minus" size={15} />
                    </button>
                    <strong>{serviceQuantity}</strong>
                    <button
                      onClick={() => setServiceQuantity(Math.min(100, serviceQuantity + 1))}
                      disabled={serviceQuantity >= 100}
                      aria-label="Увеличить количество"
                    >
                      <Icon name="plus" size={15} />
                    </button>
                  </div>
                </div>
                <div className="service-modal-price">
                  <strong>{formatPrice(selectedService.price * serviceQuantity)} ₽</strong>
                  <span>
                    {selectedService.price} ₽ / {selectedService.unit}
                  </span>
                </div>
                <button className="button button-primary full-width" onClick={addToCart}>
                  Добавить в заказ <Icon name="plus" size={17} />
                </button>
                {selectedService.id === "rug" || selectedService.id === "delicate" ? (
                  <button
                    className="service-calc-link"
                    onClick={() => {
                      setModal(null);
                      setArea(serviceQuantity);
                      if (selectedService.id === "delicate") setMaterial(1);
                      scrollTo("calculator");
                    }}
                  >
                    Настроить чистку в калькуляторе <Icon name="arrow" size={15} />
                  </button>
                ) : (
                  <p className="quote-note">Чистка на дому · Оплата после результата</p>
                )}
              </div>
            </div>
          )}
          {modal === "cart" && (
            <>
              <div className="eyebrow">ЧУТЬ БЛИЖЕ К ЧИСТОТЕ</div>
              <h2>
                Ваш заказ<span className="green-dot">.</span>
              </h2>
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <Icon name="bag" size={48} />
                  <h3>Здесь скоро станет уютнее</h3>
                  <p>
                    Выберите услугу или рассчитайте
                    <br />
                    индивидуальную чистку ковра.
                  </p>
                  <button
                    className="button button-primary"
                    onClick={() => {
                      setModal(null);
                      scrollTo("services");
                    }}
                  >
                    Выбрать услугу <Icon name="arrow" size={18} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map((item, index) => (
                      <div className="cart-item" key={item.service.id}>
                        <div className={`cart-item-visual service-image-${item.service.visual}`}>
                          <ServiceVisual visual={item.service.visual} />
                        </div>
                        <div>
                          <strong>{item.service.name}</strong>
                          <p>
                            {item.quantity} {item.service.unit} × {item.price} ₽
                          </p>
                          <span>{formatPrice(item.price * item.quantity)} ₽</span>
                        </div>
                        <button
                          className="icon-button"
                          aria-label={`Удалить ${item.service.name}`}
                          onClick={() => setCart(cart.filter((_, i) => i !== index))}
                        >
                          <Icon name="close" size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="cart-summary">
                    <span>Чистка</span>
                    <strong>{formatPrice(cartTotal)} ₽</strong>
                  </div>
                  <p className="quote-note">
                    Доставка {cartTotal >= 2500 ? "бесплатно" : "390 ₽"}. Оплата после результата.
                  </p>
                  <button
                    className="button button-primary full-width"
                    onClick={() => openBooking("cart")}
                  >
                    Перейти к оформлению <Icon name="arrow" size={18} />
                  </button>
                </>
              )}
            </>
          )}
          {modal === "booking" && (
            <>
              <div className="eyebrow">ПОСЛЕДНИЙ ШАГ К УЮТУ</div>
              <h2>Когда заедем за чистотой?</h2>
              <p className="modal-description">
                Заполните пример заказа. Мы никуда его не отправим.
              </p>
              <form
                className="booking-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  setModal("success");
                }}
              >
                <div className="form-row">
                  <div>
                    <label className="form-label" htmlFor="booking-name">
                      Как к вам обращаться
                    </label>
                    <input
                      id="booking-name"
                      className="form-input"
                      placeholder="Ваше имя"
                      required
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      autoComplete="given-name"
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="booking-phone">
                      Телефон
                    </label>
                    <input
                      id="booking-phone"
                      className="form-input"
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="+7 (999) 123-45-67"
                      required
                      pattern="[+0-9 ()-]{10,20}"
                      autoComplete="tel"
                    />
                  </div>
                </div>
                <label className="form-label" htmlFor="booking-address">
                  Адрес в городе {city}
                </label>
                <input
                  className="form-input"
                  id="booking-address"
                  placeholder="Улица, дом, квартира"
                  required
                  autoComplete="street-address"
                />
                <div className="form-row">
                  <div>
                    <label className="form-label" htmlFor="booking-date">
                      Удобная дата
                    </label>
                    <input
                      className="form-input"
                      id="booking-date"
                      type="date"
                      min={new Date().toLocaleDateString("en-CA")}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="booking-time">
                      Время
                    </label>
                    <select className="form-input" id="booking-time">
                      <option>09:00 – 12:00</option>
                      <option>12:00 – 15:00</option>
                      <option>15:00 – 18:00</option>
                      <option>18:00 – 21:00</option>
                    </select>
                  </div>
                </div>
                <div className="booking-summary">
                  <div>
                    <span>Мастер</span>
                    <strong>{providers[provider].name}</strong>
                  </div>
                  <div>
                    <span>Чистка</span>
                    <strong>{formatPrice(total)} ₽</strong>
                  </div>
                  <div>
                    <span>Доставка</span>
                    <strong>{total >= 2500 ? "Бесплатно" : "390 ₽"}</strong>
                  </div>
                  <div className="booking-total">
                    <span>Итого</span>
                    <strong>{formatPrice(total + (total >= 2500 ? 0 : 390))} ₽</strong>
                  </div>
                </div>
                <button className="button button-primary full-width" type="submit">
                  Оформить демо-заказ <Icon name="arrow" size={18} />
                </button>
                <p className="demo-notice">Данные не сохраняются. Реальная заявка не создаётся.</p>
              </form>
            </>
          )}
          {modal === "success" && (
            <div className="success-content">
              <div className="success-icon">
                <Icon name="check" size={39} />
              </div>
              <div className="eyebrow">ВСЁ ПОЛУЧИЛОСЬ</div>
              <h2>
                {name ? `${name}, ваш` : "Ваш"} ковёр
                <br />
                уже предвкушает.
              </h2>
              <p className="modal-description">
                Так будет выглядеть подтверждение заказа.
                <br />В демо-режиме мастер не получит заявку,
                <br />а ваши данные никуда не отправятся.
              </p>
              <div className="success-summary">
                <Icon name="sparkle" size={20} />
                <span>
                  {providers[provider].name} · {formatPrice(total + (total >= 2500 ? 0 : 390))} ₽
                </span>
              </div>
              <button
                className="button button-primary full-width"
                onClick={() => {
                  if (bookingSource === "cart") setCart([]);
                  setModal(null);
                }}
              >
                Отлично, спасибо <Icon name="check" size={18} />
              </button>
            </div>
          )}
        </ModalWindow>
      )}
    </div>
  );
}
