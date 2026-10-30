# drip. 简体中文版（drip-zh-CN）

**drip** 是一款开源的月经周期记录应用：数据只保存在你的手机上，不上传服务器、无广告、无追踪。它可以用来记录经期，也可以帮助你运用**症状体温法**（基础体温 + 宫颈黏液/宫颈）进行生育力认知（易孕期识别）。

本仓库是 drip 的**社区简体中文汉化版**，基于上游 [bloodyhealth/drip](https://gitlab.com/bloodyhealth/drip)（官网 <https://dripapp.org>）`main` 分支提交 `cf1dabf`（版本 1.2610.24）。它**不是** drip 官方团队或 Heart of Code e.V. 发布的版本。

**[下载 APK（GitHub Releases）](https://github.com/Tx13758627780/drip-zh-CN/releases/latest)**

> ⚠️ 医疗提示：drip 只是辅助记录工具，不能替代医生建议。若将症状体温法用于避孕，请先系统学习该方法；应用的计算结果请始终自行核对。

## 汉化内容

- 新增 `i18n/zh.json`：**en.json 中全部 327 条界面文案均已译为简体中文**（含症状说明、“了解更多”长文本、设置、密码、导入导出、提醒通知、隐私政策、许可证说明等）。
- 语言设置中新增 **简体中文**（`zh-CN`）选项。
- **自动跟随系统语言**：首次打开时若尚未手动选择语言，会根据手机系统语言自动选择（中文系统 → 简体中文；德语 → 德语；其余 → 英语）。之后可在 设置 → 语言 中随时切换。
- 日期显示中文化：首页日期（如“2026 年 10 月 30 日”）、日历月份标题（“2026 年 10 月”）、星期名（周一…周日）、图表日期（“12 日”）、周期日（“第 12 天（本周期）”）、周期阶段（“第 2 阶段 - 易孕”）。
- 保留所有插值占位符（`{{...}}`）、嵌套引用（`$t(...)`）和链接标记（`<0>...</0>`），并提供校验脚本 `pnpm translations:validate`。

### 术语对照

| 英文                                  | 中文                                     |
| ------------------------------------- | ---------------------------------------- |
| sympto-thermal method                 | 症状体温法                               |
| basal body temperature                | 基础体温                                 |
| cervical mucus                        | 宫颈黏液                                 |
| cervix                                | 宫颈                                     |
| bleeding / spotting                   | 出血 / 点滴出血                          |
| fertile / infertile                   | 易孕 / 不易孕                            |
| temperature shift                     | 体温转变                                 |
| peri-ovulatory / post-ovulatory phase | 围排卵期 / 排卵后期                      |
| secondary symptom                     | 次要症状                                 |
| regular rule / 1st / 2nd exception    | 基本规则 / 第 1 例外规则 / 第 2 例外规则 |
| creamy / egg white (mucus)            | 乳脂状 / 蛋清样                          |

宫颈黏液等级符号 `t`、`Ø`、`f`、`S`、`S+` 是症状体温法通用的记录符号，保持原样（说明文本中注明了含义）。

## 安装方法（Android）

1. 在 [Releases](https://github.com/Tx13758627780/drip-zh-CN/releases/latest) 下载 `drip-zh-CN-v1.2610.24-zh.1.apk`（通用包，支持 arm64-v8a / armeabi-v7a / x86_64，Android 7.0+）。
2. 用浏览器或文件管理器打开 APK，按提示允许“安装未知应用”后安装。
3. 系统语言为中文时，应用会自动显示中文；也可在 菜单 → 设置 → 语言 中选择“简体中文”。

**与官方版共存**：本版包名为 `com.drip.zhcn`，与官方 drip（`com.drip`）互不冲突，可同时安装。两者数据**不互通**；如需迁移，请在官方版 设置 → 数据 → 导出数据（CSV），再在本版中导入。

**签名**：APK 使用本仓库维护者自建的签名密钥（不在仓库中），与官方版签名不同。

- 签名证书 SHA-256：`669DBDD8A44D4941214A1740ECCE3D91865E30DE2F340A33D1875988952FF59C`
- APK 的 SHA-256 见 Release 附件中的 `SHA256SUMS`。

iOS：本仓库不提供 iOS 安装包（需要 Apple 开发者签名）。源码中的汉化同样适用于 iOS，可自行构建。

## 从源码构建

需要 Node 20+、pnpm 10、JDK 17、Android SDK 36、NDK 27.1.12297006：

```bash
git clone https://github.com/Tx13758627780/drip-zh-CN.git
cd drip-zh-CN
pnpm install
pnpm translations:validate   # 校验中文翻译的 key 与占位符
pnpm test
cd android
# 需先配置签名参数（见下）；仅本地试用可改用 ./gradlew assembleDebug
./gradlew assembleRelease -PDRIP_APPLICATION_ID_SUFFIX=.zhcn -PDRIP_VERSION_NAME_SUFFIX=-zh.1
```

签名参数（`DRIP_RELEASE_STORE_FILE` 等）请放在 `~/.gradle/gradle.properties` 中，切勿提交到仓库。

## 与上游的关系

- 完整保留上游 git 历史，本仓库的改动以独立提交叠加在上游 `cf1dabf` 之上，便于对比和日后同步上游。
- 本仓库只做汉化及与中文显示相关的少量改动，不改变周期计算、症状体温法规则或数据存储逻辑。
- drip 的原作者是 drip 团队（Heart of Code e.V. 的项目）。功能问题请参考上游项目；汉化问题欢迎在本仓库提 Issue。
- 如果你喜欢 drip，欢迎通过 [官网](https://dripapp.org) 支持原作者。

### 本仓库的改动

- `i18n/zh.json`：简体中文翻译（新增）
- `i18n/i18n.js`、`i18n/constants.ts`：注册 `zh-CN`；`languageFromLocale()` 将系统语言映射为应用语言
- `i18n/device-language.ts`：读取系统语言（新增）；`local-storage.ts`：未手动选择语言时使用系统语言
- `i18n/en.json`、`i18n/de.json`：新增语言名称“简体中文”
- `components/helpers/home.js`：中文序数（“第 12”、“12 日”）
- `components/calendar.js`：中文日历月份标题“yyyy 年 M 月”
- `android/app/build.gradle`：可选的包名后缀 / 版本名后缀参数（默认不影响官方构建）
- `scripts/validate-translations.mjs`、`test/language.spec.ts`、`test/home-helpers.spec.js`：翻译校验与测试

## 许可证（GPL-3.0）

drip 以 **GNU 通用公共许可证 第 3 版或更高版本（GPL-3.0-or-later）** 发布，版权归 Heart of Code e.V. 及 drip 贡献者所有。本汉化版作为衍生作品，同样以 GPL-3.0-or-later 发布，完整许可证见 [LICENSE](LICENSE)。依据 GPL，你可以自由使用、研究、修改和再分发本程序，但再分发时必须同样以 GPL 提供源代码。本程序不提供任何担保。

---

以下为上游项目原始 README（英文）：

## drip – open-source cycle tracking app

A menstrual cycle tracking app that's open-source and leaves your data on your phone. Use it to track your menstrual cycle and/or for fertility awareness!
Find more information on [our website](https://dripapp.org/).

[<img src="https://dripapp.org/assets/get.png"
     alt="Get it here"
     height="55">](https://dripapp.org/release/v1.2311.14.apk)
[<img src="https://dripapp.org/assets/badge_google-play.png"
     alt="Get it on Google Play"
     height="55">](https://dripapp.org/android)
[<img src="https://dripapp.org/assets/badge_app-store.png"
    alt="Get drip on the App Store"
    height="55">](https://dripapp.org/ios)
[<img src="https://dripapp.org/assets/badge_f-droid.png"
     alt="Get it on F-Droid"
     height="55">](https://dripapp.org/fdroid)

The app is built with React Native and runs on Android and iOS.

▶ [How to contribute to the project](https://gitlab.com/bloodyhealth/drip/blob/main/CONTRIBUTING.md)

▶ [How to release a new version](https://gitlab.com/bloodyhealth/drip/blob/main/RELEASE.md)

## Development setup

### 1. Clone this repository

Using SSH:

```bash
git clone git@gitlab.com:bloodyhealth/drip.git
```

Using HTTPS:

```bash
git clone https://gitlab.com/bloodyhealth/drip.git
```

---

## 2. Set up your environment

### 2.1 Node.js

Make sure you are running **Node 20** and **PNPM**.  
The easiest way to manage Node versions is via `nvm`. Follow the [NVM installation instructions](https://github.com/nvm-sh/nvm#installing-and-updating), then restart your terminal.

From the project root, run:

```bash
nvm use
```

### 2.2 PNPM

**Option 1 – Use Corepack (recommended)**

Corepack is a Node script that lets you use package managers without installing them globally.  
Enable Corepack:

```bash
corepack enable
```

Verify that PNPM is available:

```bash
pnpm --version
```

**Option 2 – Install PNPM manually**

Follow the [PNPM installation docs](https://pnpm.io/installation).

### 2.3 React Native tooling

Follow the official React Native guide for setting up Android and iOS development:

- [React Native environment setup](https://reactnative.dev/docs/0.82/set-up-your-environment)

---

## 3. Run the app on Android

First, either:

- create and start an [Android virtual device](https://reactnative.dev/docs/0.82/set-up-your-environment) (see “Using a virtual device”), or
- [set up your Android phone](https://reactnative.dev/docs/0.82/running-on-device) to run the app.

From the project root:

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Start the Metro bundler** (keep this running in its own tab):

   ```bash
   pnpm start
   ```

3. **Build and run on Android**:

   ```bash
   pnpm android
   ```

4. **View logs** (optional, in another tab):

   ```bash
   pnpm log
   ```

5. **Clear cache** (if you previously had an older drip installation):

   ```bash
   pnpm clear
   ```

6. **Enable hot reloading**:

   ```bash
   adb shell input keyevent 82
   ```

We also recommend installing an [ESLint plugin in your editor](https://eslint.org/docs/user-guide/integrations#editors).  
The project includes an `.eslintrc` to help catch style issues and potential bugs.

---

## 4. Run the app on iOS

### 4.1 Install CocoaPods and dependencies

1. **Install JS dependencies**

   ```bash
   pnpm install
   ```

2. **Install iOS (CocoaPods) dependencies** from the project root:

   ```bash
   cd ios && bundle install && bundle exec pod install && cd ..
   ```

3. **Run the app**

   - Option A: open the `drip.xcworkspace` in Xcode and run “Build”.
   - Option B: from the project root:

     ```bash
     pnpm ios
     ```

4. If you build via Xcode, ensure the Metro bundler is running:

   ```bash
   pnpm start
   ```

---

## Troubleshooting

### macOS: `adb` not on the path

If you see errors about `adb` not being found:

```bash
ln -s ~/Library/Android/sdk/platform-tools/adb /usr/local/bin/adb
```

### Clearing project cache

Use the `clear` script to reset caches and/or reinstall libraries:

```bash
pnpm clear
```

Supported options:

- `all` – delete all caches and reinstall project libraries
- `ios` – delete iOS-related cache
- `android` – delete Android-related cache
- `cache` – purge Watchman, Metro bundler, Packager, and React caches
- `npm` – reinstall project libraries

For example, to clear the Android part of the project and reinstall libraries:

```bash
pnpm clear android npm
```

---

## Tests

### Unit tests

Run unit tests with:

```bash
pnpm test
```

### Manual testing

For manual QA of core functionality, see the [test protocol](https://gitlab.com/bloodyhealth/drip/-/snippets/2283405).

---

## NFP rules

Learn more about how drip calculates fertility status and bleeding predictions in the  
[NFP rules section of the GitLab wiki](https://gitlab.com/bloodyhealth/drip/wikis/home).

---

## Adding a new tracking icon

1. Use [fontello](http://fontello.com/) to generate icon fonts. Upload the full set of tracking icons (bleeding, cervical mucus, etc.), including the new icon you want to add, all as SVGs.
2. Download the webfont from fontello.
3. Copy `config.json` and `font.tff` into `assets/fonts`, replacing the current `config-drip-icon-font.json` and `drip-icon-font.tff`.
4. Run:

   ```bash
   react-native link
   ```

5. The new icon should now be available in drip (for example, in the Cycle Day overview and the chart).
