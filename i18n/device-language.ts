import { NativeModules, Platform } from 'react-native'

import { Language, languageFromLocale } from './constants'

const DEFAULT_LANGUAGE: Language = 'en-US'

function getDeviceLocales(): string[] {
  const locales: string[] = []
  try {
    if (Platform.OS === 'ios') {
      const settings = NativeModules.SettingsManager?.settings
      if (settings?.AppleLanguages?.length) {
        locales.push(...settings.AppleLanguages)
      }
      if (settings?.AppleLocale) locales.push(settings.AppleLocale)
    } else {
      const constants = NativeModules.I18nManager?.getConstants?.()
      const localeIdentifier =
        constants?.localeIdentifier ??
        NativeModules.I18nManager?.localeIdentifier
      if (localeIdentifier) locales.push(localeIdentifier)
    }
  } catch (_: unknown) {
    // ignore and fall back to Intl below
  }
  try {
    locales.push(Intl.DateTimeFormat().resolvedOptions().locale)
  } catch (_: unknown) {
    // Intl not available
  }
  return locales
}

/**
 * Best guess of the app language based on the device locale. Used when the
 * user has not picked a language in the settings yet, so that e.g. a phone set
 * to Chinese shows the app in Simplified Chinese right away.
 */
export function getDeviceLanguage(): Language {
  for (const locale of getDeviceLocales()) {
    const language = languageFromLocale(locale)
    if (language) return language
  }
  return DEFAULT_LANGUAGE
}
