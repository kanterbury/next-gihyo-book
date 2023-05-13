/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { theme } from "@/themes";
import { Responsive, ResponsiveProp } from "@/types/styles";

export type AppThema = typeof theme;

type SpaceThemesKeys = keyof typeof theme.space;
type ColorThemesKeys = keyof typeof theme.colors;
type FontSizeThemesKeys = keyof typeof theme.fontSizes;
type LetterSpacingThemesKeys = keyof typeof theme.letterSpacings;
type LineHeightThemesKeys = keyof typeof theme.lineHeights;

// 各Themeのキーの型
export type Space = SpaceThemesKeys | (string & {});
export type Color = ColorThemesKeys | (string & {});
export type FontSize = FontSizeThemesKeys | (string & {});
export type LetterSpacing = LetterSpacingThemesKeys | (string & {});
export type LineHeight = LineHeightThemesKeys | (string & {});

const BRAKEPOINTS: { [key: string]: string } = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
};

/**
 * Responsivet型をCSSのプロパティに変換する
 * @param propKey CSSプロパティ
 * @param prop Responsivet型
 * @param theme AppTheme
 * @returns CSSプロパティ
 */
export function toPropsValue<T>(
  propKey: string,
  prop?: Responsive<T>,
  theme?: AppThema
) {
  if (prop === undefined) {
    return undefined;
  }
  if (isResponsivePropType(prop)) {
    const result = [];
    for (const responsiveKey in prop) {
      if (responsiveKey === "base") {
        result.push(
          `${propKey}: ${toThemeValueIfNeeded(
            propKey,
            prop[responsiveKey],
            theme
          )}`
        );
      } else if (
        responsiveKey === "sm" ||
        responsiveKey === "md" ||
        responsiveKey === "lg" ||
        responsiveKey === "xl"
      ) {
        // メディアクエリでのスタイル
        const brakepoint = BRAKEPOINTS[responsiveKey];
        const style = `${propKey}: ${toThemeValueIfNeeded(
          propKey,
          prop[responsiveKey],
          theme
        )}`;
        result.push(
          `@media screen and (min-width: ${brakepoint}) { ${style} }`
        );
      }
    }
    return result.join("\n");
  }
  return `${propKey}: ${toThemeValueIfNeeded(propKey, prop, theme)}`;
}

function isResponsivePropType<T>(prop: any): prop is ResponsiveProp<T> {
  return (
    prop &&
    (prop.base !== undefined ||
      prop.sm !== undefined ||
      prop.md !== undefined ||
      prop.lg !== undefined ||
      prop.xl !== undefined)
  );
}

const SPACE_KEYS = new Set([
  "margin",
  "margin-top",
  "margin-right",
  "margin-bottom",
  "margin-left",
  "padding",
  "padding-top",
  "padding-right",
  "padding-bottom",
  "padding-left",
]);
const COLOR_KEYS = new Set(["color", "background-color"]);
const FONT_SIZE_KEYS = new Set(["font-size"]);
const LINE_SPACING_KEYS = new Set(["letter-spacing"]);
const LINE_HEIGHT_KEYS = new Set(["line-height"]);

function toThemeValueIfNeeded<T>(propKey: string, value: T, theme?: AppThema) {
  if (
    theme &&
    theme.space &&
    SPACE_KEYS.has(propKey) &&
    isSpaceThemeKey(value, theme)
  ) {
    return theme.space[value];
  } else if (
    theme &&
    theme.colors &&
    COLOR_KEYS.has(propKey) &&
    isColorThemeKey(value, theme)
  ) {
    return theme.colors[value];
  } else if (
    theme &&
    theme.fontSizes &&
    FONT_SIZE_KEYS.has(propKey) &&
    isFontSizeThemeKey(value, theme)
  ) {
    return theme.fontSizes[value];
  } else if (
    theme &&
    theme.letterSpacings &&
    LINE_SPACING_KEYS.has(propKey) &&
    isLetterSpacingThemeKey(value, theme)
  ) {
    return theme.letterSpacings[value];
  } else if (
    theme &&
    theme.lineHeights &&
    LINE_HEIGHT_KEYS.has(propKey) &&
    isLineHeightThemeKey(value, theme)
  ) {
    return theme.lineHeights[value];
  }
  return value;
}

function isSpaceThemeKey(prop: any, theme: AppThema): prop is SpaceThemesKeys {
  return Object.keys(theme.space).filter((key) => key == prop).length > 0;
}

function isColorThemeKey(prop: any, theme: AppThema): prop is ColorThemesKeys {
  return Object.keys(theme.colors).filter((key) => key == prop).length > 0;
}

function isFontSizeThemeKey(
  prop: any,
  theme: AppThema
): prop is FontSizeThemesKeys {
  return Object.keys(theme.fontSizes).filter((key) => key == prop).length > 0;
}

function isLetterSpacingThemeKey(
  prop: any,
  theme: AppThema
): prop is LetterSpacingThemesKeys {
  return (
    Object.keys(theme.letterSpacings).filter((key) => key == prop).length > 0
  );
}

function isLineHeightThemeKey(
  prop: any,
  theme: AppThema
): prop is LineHeightThemesKeys {
  return Object.keys(theme.lineHeights).filter((key) => key == prop).length > 0;
}
