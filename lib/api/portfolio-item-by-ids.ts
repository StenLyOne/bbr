import type { PortfolioItemRaw } from "../../lib/api/portfolio";
import { API_DOMAIN } from "./config";

type NextishInit = RequestInit & {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
};
/**
 * Тянет портфолио‑айтемы по списку ID.
 * Делает:
 *  - фильтр и дедупликацию ID
 *  - кэширование (ISR) на 10 минут с тегом "portfolio-items"
 *  - сохранение порядка, в котором передали ids
 */
export async function fetchPortfolioItemsByIds(
  ids: number[],
  opts: { revalidate?: number } = {}
): Promise<PortfolioItemRaw[]> {
  // 1) нормализуем вход
  const uniqueIds = Array.from(
    new Set(
      ids.map((v) => Number(v)).filter((n) => Number.isFinite(n) && n > 0)
    )
  );

  if (uniqueIds.length === 0) return [];

  // 2) собираем URL
  const url = `${API_DOMAIN}/wp-json/bbr/v1/portfolio-items?include=${uniqueIds.join(
    ","
  )}`;

  // 3) фетчим с ISR-кэшем (10 мин по умолчанию) и тегом
  const res = await fetch(url, {
    next: {
      revalidate: opts.revalidate ?? 60,
      tags: ["portfolio-items"],
    },
  } as NextishInit);

  if (!res.ok) {
    throw new Error(`Failed to fetch portfolio items: ${res.status}`);
  }

  // 4) парсим и проверяем тип
  const json: unknown = await res.json();
  if (!Array.isArray(json)) {
    throw new Error("Portfolio items response is not an array");
  }

  // 5) приведём к ожидаемому типу
  const items = json as PortfolioItemRaw[];

  // 6) сохраним порядок как в uniqueIds (на случай, если API меняет порядок)
  const byId = new Map(items.map((it) => [it.id, it]));
  const ordered = uniqueIds
    .map((id) => byId.get(id))
    .filter(Boolean) as PortfolioItemRaw[];

  return ordered;
}
