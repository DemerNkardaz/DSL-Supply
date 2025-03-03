# DSL-Supply [TBD]

![Static Badge](<https://img.shields.io/badge/%F0%9F%94%96-%CE%AC%CE%BB%CF%86%CE%B1%20(dev)-yellow>) ![Static Badge](https://img.shields.io/badge/-Mozilla Firefox-yellow) ![GitHub commit activity](https://img.shields.io/github/commit-activity/m/DemerNkardaz/DSL-Supply?color=yellow)

# Table of Contents [Содержание]

- [Overview](#overview)
- [Обзор](#обзор)
  - [«Быстрые ключи»](#быстрые-ключи)

# Overiew

<img src="https://raw.githubusercontent.com/DemerNkardaz/DSL-KeyPad/refs/heads/main/__dev/DSLKeyPad_App_Icons/DSLKeyPad.app_browserext.ico" alt="" width="128" align="left">

DSL Supply is a Firefox extension that partially implements the features of [“DSL KeyPad”](https://github.com/DemerNkardaz/DSL-KeyPad) within the browser. It provides an interface for a symbol library, input of characters via key combinations (<kbd>AltGr A → Ă</kbd>), and a "Compose" mode that allows users to produce characters through sequential inputs (<kbd>AE → Æ</kbd>).<br><br>

# Обзор

DSL Supply — расширение для Firefox, частично реализующее возможности [«DSL KeyPad»](https://github.com/DemerNkardaz/DSL-KeyPad) в рамках браузера, а именно: интерфейс библиотеки символов; ввод символов посредством комбинаций клавиш (<kbd>AltGr A → Ă</kbd>) и режим «Compose» для получения символов посредством последовательностей других (<kbd>AE → Æ</kbd>).<br><br>

## «Быстрые ключи»

Основной метод для ввода _«базовой группы символов»_ латиницы, кириллицы, пунктуации, шпаций и прочих знаков. Утилизирует <kbd>LAlt</kbd>, <kbd>LCtrl LAlt</kbd>, <kbd>RAlt</kbd>, <kbd>RShift</kbd> как стартовые модификаторы для комбинаций, например:

- <kbd>RAlt A</kbd> — Ă
- <kbd>RAlt RShift A</kbd> — Ā
- <kbd>RAlt LShift A</kbd> — Ä
- <kbd>RAlt LShift RShift A</kbd> — Ã
- <kbd>RAlt LAlt A</kbd> — Â
- <kbd>RAlt LAlt RShift A</kbd> — Ą
- <kbd>RAlt LAlt LShift A</kbd> — Å
- <kbd>LAlt A</kbd> — Á
- <kbd>RShift A</kbd> — À
- <kbd>RShift LShift A</kbd> — Ȁ

«Быстрые ключи» могут быть деактивированы в настройках popup‐меню расширения. Группировка комбинаций происходит по следующему принципу: <kbd>LCtrl LAlt</kbd> в «Быстрых ключах» отведены в основном под комбинируемую диакритику (за исключением <kbd>LCtrl LAlt - _или_ NumPad0</kbd>, дающим _мягкий перенос_ или ◌ соответственно), например — <kbd>LCtrl LAlt M</kbd> даст ◌̄, <kbd>… LShift D</kbd> — ◌̈ ; <kbd>RAlt</kbd> — основная клавиша для ввода прочих символов; <kbd>LAlt / RShift</kbd> используются по остаточному принципу — если, например, что‐то не влезло в <kbd>RAlt</kbd> — символы латиницы с акутом располагаются именно на комбинациях с <kbd>LAlt</kbd>, а с грависом — на комбинациях с <kbd>RShift</kbd>.
