import { mergeProps } from "@zag-js/solid";

type StyleValue = string | Record<string, string | number | null | undefined> | null | undefined;

type PropsWithStyle = { style?: StyleValue } & Record<string, unknown>;

const hyphenate = (property: string) =>
  property.startsWith("--")
    ? property
    : property.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);

const serializeStyle = (style: Exclude<StyleValue, null | undefined>): string => {
  if (typeof style === "string") return style;
  let css = "";
  for (const property in style) {
    const value = style[property];
    if (value == null || value === "") continue;
    const declaration = `${hyphenate(property)}: ${value}`;
    css = css ? `${css};${declaration}` : declaration;
  }
  return css;
};

// Compose styles as CSS declarations, keeping native strings verbatim so
// `!important` priorities and semicolons inside values (e.g. data URLs) survive.
// Consumer declarations come last so they win ties.
const composeStyles = (widgetStyle: StyleValue, consumerStyle: StyleValue): StyleValue => {
  if (consumerStyle == null) return widgetStyle;
  if (widgetStyle == null) return consumerStyle;
  const widgetCss = serializeStyle(widgetStyle);
  const consumerCss = serializeStyle(consumerStyle);
  if (!widgetCss) return consumerStyle;
  if (!consumerCss) return widgetStyle;
  return `${widgetCss};${consumerCss}`;
};

export function mergeWidgetProps<Behavior extends object, Props extends object>(
  behavior: Behavior,
  props: Props,
) {
  // Zag composes functions; Solid also accepts [handler, data] event bindings.
  const normalized = new Proxy(props, {
    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver);
      if (
        typeof key === "string" &&
        key.startsWith("on") &&
        Array.isArray(value) &&
        typeof value[0] === "function"
      ) {
        return (event: Event) => value[0](value[1], event);
      }
      return value;
    },
  });

  // Zag's merger converts native style strings into objects, dropping
  // `!important` and truncating values at their first semicolon, so compose
  // style here and let Zag merge every other prop.
  const { style: widgetStyle, ...behaviorProps } = behavior as PropsWithStyle;
  const { style: consumerStyle, ...consumerProps } = normalized as PropsWithStyle;
  const merged = mergeProps(behaviorProps, consumerProps);
  const style = composeStyles(widgetStyle, consumerStyle);
  return style === undefined ? merged : { ...merged, style };
}
