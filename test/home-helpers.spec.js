import {
  formatWithOrdinalSuffix,
  getOrdinalSuffix,
} from '../components/helpers/home'
import i18n from '../i18n/i18n'

describe('Home helper: getOrdinalSuffix', () => {
  afterEach(async () => {
    await i18n.changeLanguage('en-US')
  })

  test("For 1, it returns suffix 'st'", () => {
    expect(getOrdinalSuffix(1)).toEqual('st')
  })

  test("For 2, it returns suffix 'nd'", () => {
    expect(getOrdinalSuffix(2)).toEqual('nd')
  })

  test("For 3, it returns suffix 'rd'", () => {
    expect(getOrdinalSuffix(3)).toEqual('rd')
  })

  test("For 11, it returns suffix 'th'", () => {
    expect(getOrdinalSuffix(11)).toEqual('th')
  })

  test("For 23, it returns suffix 'rd'", () => {
    expect(getOrdinalSuffix(23)).toEqual('rd')
  })

  test('if language is German, it returns no suffix', async () => {
    await i18n.changeLanguage('de-DE')

    expect(getOrdinalSuffix(15)).toEqual('.')
  })

  test("if language is Chinese, it returns suffix '日'", async () => {
    await i18n.changeLanguage('zh-CN')

    expect(getOrdinalSuffix(15)).toEqual('日')
  })
})

describe('Home helper: formatWithOrdinalSuffix', () => {
  afterEach(async () => {
    await i18n.changeLanguage('en-US')
  })

  test('in English it appends the ordinal suffix', () => {
    expect(formatWithOrdinalSuffix(12)).toEqual('12th')
  })

  test("in Chinese it prefixes '第'", async () => {
    await i18n.changeLanguage('zh-CN')

    expect(formatWithOrdinalSuffix(12)).toEqual('第12')
  })
})
