export const Languages = ['en-US', 'de-DE', 'zh-CN'] as const
export type Language = (typeof Languages)[number]

export function isLanguage(value: string | null): value is Language {
  return Languages.some((language) => language === value)
}

/**
 * Maps a device/system locale identifier (e.g. "zh_CN_#Hans", "zh-Hans-CN",
 * "de-AT", "en_US") to one of the supported app languages.
 * Returns null if the locale is not supported.
 */
export function languageFromLocale(locale?: string | null): Language | null {
  if (!locale) return null
  const normalized = locale.replace(/_/g, '-').toLowerCase()
  if (normalized.startsWith('zh')) return 'zh-CN'
  if (normalized.startsWith('de')) return 'de-DE'
  if (normalized.startsWith('en')) return 'en-US'
  return null
}
