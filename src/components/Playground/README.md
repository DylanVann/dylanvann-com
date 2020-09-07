## Controlled Props

Some `Playground` props allow for controlled mode or uncontrolled mode.

These props will have:

- `prop`
- `propControlled`
- `propOnChange`

This is different from the usual React naming scheme of:

- `prop`
- `defaultProp`
- `onChangeProp`

These are suffixed instead of prefixed for better alphabetical grouping.
We use `prop` as the `defaultProp` because most users are not interested in controlled mode.
