import { languageFromLocale } from '../i18n/constants'
import i18n from '../i18n/i18n'
import zh from '../i18n/zh.json'
import en from '../i18n/en.json'

describe('languageFromLocale', () => {
  test.each([
    ['zh_CN_#Hans', 'zh-CN'],
    ['zh-Hans-CN', 'zh-CN'],
    ['zh-CN', 'zh-CN'],
    ['zh', 'zh-CN'],
    ['de_AT', 'de-DE'],
    ['en_GB', 'en-US'],
    ['fr-FR', null],
    [undefined, null],
  ])('%s -> %s', (locale, expected) => {
    expect(languageFromLocale(locale)).toBe(expected)
  })
})

describe('zh-CN translation', () => {
  afterEach(async () => {
    await i18n.changeLanguage('en-US')
  })

  test('has the same keys as en.json', () => {
    expect(Object.keys(zh).sort()).toEqual(Object.keys(en).sort())
  })

  test('resolves nested temperature rule translations', async () => {
    await i18n.changeLanguage('zh-CN')
    expect(i18n.t('cycleDay.fertilityStatus.postOvu', { rule: 0 })).toContain(
      '基本规则'
    )
    expect(i18n.t('cycleDay.fertilityStatus.postOvu', { rule: 1 })).toContain(
      '第 1 例外规则'
    )
    expect(i18n.t('cycleDay.fertilityStatus.postOvu', { rule: 2 })).toContain(
      '第 2 例外规则'
    )
  })

  test('shows Chinese language name in the language list', async () => {
    await i18n.changeLanguage('zh-CN')
    expect(i18n.t('sideMenu.settings.language.languages.zh-CN')).toBe(
      '简体中文'
    )
  })
})
