---
name: DalelCheck
description: The inherited working cabinet for exact source quotes, manual findings and an explicit immutable whole report.
colors:
  primary: "#126653"
  primary-hover: "#0b5343"
  navy: "#183e60"
  ink: "#172e45"
  page: "#edf3f8"
  surface: "#ffffff"
  line: "#b9cbd9"
  navigation-surface: "#dce9f3"
  muted: "#46627a"
  input-stroke: "#7894aa"
  link: "#174e7e"
  pending: "#795200"
  error: "#942721"
  error-surface: "#fff0ee"
  focus: "#bd671a"
  selection-surface: "#b7ded2"
  selection-ink: "#132f29"
typography:
  primary-heading:
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "2rem"
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  section-heading:
    fontSize: "1.3rem"
  brand:
    fontSize: "1.4rem"
    fontWeight: 740
  body:
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  label:
    fontWeight: 600
  supporting:
    fontSize: "0.9rem"
  preformatted:
    fontSize: "0.85rem"
rounded:
  control: "7px"
  panel: "12px"
spacing:
  evidence-gap: "0.4rem"
  inline-gap: "0.5rem"
  action-gap: "0.6rem"
  control-inset: "0.7rem"
  table-cell: "0.9rem"
  unit: "1rem"
  page-inline: "1.25rem"
  panel-inset: "1.4rem"
  section: "2rem"
  ordered-inset: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "0.65rem 1rem"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.navy}"
    rounded: "{rounded.control}"
    padding: "0.65rem 1rem"
  button-default:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "0.65rem 1rem"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "{spacing.control-inset}"
    width: "100%"
  panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.panel}"
    padding: "{spacing.panel-inset}"
  navigation-current:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.navy}"
    rounded: "{rounded.control}"
    padding: "0.65rem 1rem"
  record-table:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.panel}"
    width: "100%"
  exact-quote:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    padding: "0.7rem 1rem"
  snapshot-disclosure:
    padding: "0.7rem 0"
  error-notice:
    backgroundColor: "{colors.error-surface}"
    textColor: "{colors.error}"
    rounded: "{rounded.control}"
    padding: "{spacing.unit}"
---

# Design System: DalelCheck

## Overview

**Creative North Star: "The Shared Work Cabinet"**

DalelCheck extends its own KoshiMap/BekitChange Shared Work Cabinet: navy identity and navigation, a pale blue workspace, white labelled native forms, green explicit actions and system typography. This is a narrow inherited extension; its authority is the [KoshiMap design system](../koshi-map/DESIGN.md) and [sidecar](../koshi-map/.impeccable/design.json), pinned to own-source commit `fd22ccc94556ee526b6f8eebde518c09b972e377`. No new visual world or image comp is introduced.

Its character is flat, direct and readable. A frozen synthetic source and ordered bilingual requirements remain available beside manually authored findings. Exact quoted spans, written state labels and an explicit whole-report action carry the work. A saved report is historical evidence of those manual entries, with actor, time and digest; it is not an automatic judgement of meaning or truth.

**Key Characteristics:**

- Inherited navy shell, cool workspace and flat white controls.
- System typography, visible labels and native selection, tables and disclosures.
- Exact source text, bilingual requirements and coordinate-labelled quote blocks.
- Manual supported, missing and conflicting findings expressed in words.
- Unsaved preview, refused save and immutable saved report kept visibly distinct.

## Colors

The frontmatter owns the implemented values from [the root palette and controls](public/styles.css#L1). Palette names and derived inspection ramps continue the identical inherited system; the ramps are metadata, not additional UI colors.

### Primary

- **Working Green / Deep Working Green** (`primary`, `primary-hover`): primary actions and submit controls. Both report statuses use green; the written status and explanation carry their different meanings.

### Secondary

- **Cabinet Navy** (`navy`): header, baseline filled buttons, secondary borders and navigation text.
- **Link Blue** (`link`): ordinary links and field carets.

### Tertiary

- **Pending Amber** (`pending`): findings not yet filled.
- **Error Red / Pale Error** (`error`, `error-surface`): focused write-refusal notice.
- **Focus Amber** (`focus`): focus-visible outline across native controls and disclosures.
- **Soft Selection Green / Selection Ink** (`selection-surface`, `selection-ink`): native text selection.

### Neutral

- **Cabinet Ink** (`ink`): main text and authored evidence.
- **Cool Workspace / White Surface** (`page`, `surface`): page ground and native fields, form panels, tables and quote blocks.
- **Divider Blue / Navigation Mist** (`line`, `navigation-surface`): borders, dividers, navigation ground and table headings.
- **Supporting Slate / Field Slate** (`muted`, `input-stroke`): helpers/footer and native field strokes/scrollbars.

**The Inherited Shell Rule.** Extend the existing Shared Work Cabinet palette, typography and native navigation grammar.

## Typography

The system stack serves body, headings and controls; no font asset is loaded. Use the frontmatter's fixed task heading, smaller section heading, heavier brand and connected label roles. Unspecified body size and heading weights retain browser defaults. Native preformatted source uses the smaller `preformatted` role; tables use tabular numerals. Paragraphs use maximum measure (72ch) and line height (1.6). Source: [type and paragraph rules](public/styles.css#L63), [native fields](public/styles.css#L91), [preformatted text](public/styles.css#L235).

The shell language is Russian. Authored requirement descriptions and texts use separate RU and KK nodes; source, rationale and quote nodes use the frozen document language. Quotes preserve visible line breaks through `white-space: pre-wrap`; raw source wraps without clipping. No translation, case folding or normalization is implied. Source: [authored helper](public/app.js#L4), [requirements](public/app.js#L28), [finding renderer](public/app.js#L32).

**The Authored Evidence Rule.** Preserve authored RU/KK text, language nodes and source line breaks; exact containment does not establish meaning or truth.

## Layout

Header and navigation share inline padding (`max(1.25rem, calc((100% - 1160px) / 2))`). Main is centered at maximum width (1200px), padding (`2rem 1.25rem`) and minimum height (75vh). Navigation wraps at every width. Action rows wrap; retained optional two-column work and paired-row grids remain available. Forms use the recorded white panel inset, while worksheet metadata and findings sit directly on the pale ground. Source: [shell and grids](public/styles.css#L26), [actions](public/styles.css#L144), [final navigation rule](public/styles.css#L417).

Worksheet order is title → owner/language/publication version → full-source disclosure → exact-requirements disclosure → coverage and ordered findings → complete preview → allowed closure form → refresh/return. Findings repeat both authored requirement texts, code, manual verdict, rationale and exact quote coordinates. Saved detail replaces editable findings and closure form with report actor, time, note, digest and historical findings. Source: [worksheet rendering](public/app.js#L34).

At the source-defined stacked breakpoint (700px), optional grids become one column, main/panel insets reduce, header identity narrows and navigation/button sizing adapts. At (600px), search stacks, cells have minimum width (140px), table type shrinks and a horizontal-scroll hint appears. A labelled focusable wrapper owns table scrolling. These are [source-defined rules](public/styles.css#L258), not verified mobile rendering.

The [fresh finish review](docs/finish-review.json) records `ship` for the supplied UI/source scope with zero material fixes. This documentation pass opened all seven nonblank full-page images and verified each docs/source pair against [capture provenance](docs/capture-provenance.json). They are unedited local IAB screenshots of this product's synthetic runtime (`127.0.0.1:8855`), captured at actual width (1280 CSS px). The shipping JPEGs are byte-identical to their `.impeccable/review/` originals:

| Capture | Actual raster dimensions | SHA-256 |
| --- | --- | --- |
| [complete-1280](docs/complete-1280.jpg) | 1280 × 1595 | `2e097941a16e92e09355230a6440d85c44fb2ce94136255265a2fbad530d70a0` |
| [preview-1280](docs/preview-1280.jpg) | 1280 × 2622 | `802106314a7f9ef64b9e0e12c88e5a63b69ff1f0b3fe72fc65e211b7c103d729` |
| [report-1280](docs/report-1280.jpg) | 1280 × 1653 | `0d7bd5db0b46268f2856da1ef00cf2396d02428f6eeb8799a37c8b097b432394` |
| [finding-form-1280](docs/finding-form-1280.jpg) | 1280 × 1523 | `31dd5d1a23b51f9766c1bb7d9f112bd7743b095ac59612a0211056d52303a5b2` |
| [missing-preview-1280](docs/missing-preview-1280.jpg) | 1280 × 2498 | `5f471c263764a6d78fb61c91c9b58b831ba22de205fe36235f0f2db2c5398359` |
| [source-open-1280](docs/source-open-1280.jpg) | 1280 × 2149 | `cbee1290067941f2fecbff0a34d2be6f07569184a20c0d55b60edc841757a2cf` |
| [stale-refusal-1280](docs/stale-refusal-1280.jpg) | 1280 × 2691 | `31e19afab40b10ba684a9fa69f1c351b61f904f9608fb86190c808625ef9491b` |

The images record earlier workflow states; they do not state the current database contents or reopen immutable reports. This pass ran context, read the named sources and checked images/hashes; it did not rerun browser interactions, the detector or backend tests. Builder-reported native selection, CRLF offset handling and keyboard save remain reported behavior rather than repeated documenter tests. Mobile/390px, 1440px, touch, screen-reader, exhaustive keyboard, empty/overlong/hover/loading and every role/archive state remain unverified. Neither this packet nor source semantics certify backend concurrency, isolation, restore authenticity, transport, security, real-document suitability, integrations or customer outcomes.

## Elevation & Depth

No shadow, transition, animation or backdrop treatment is defined. Cool page ground, white panels and square quote blocks, one-pixel boundaries and section spacing convey hierarchy. Hover brightens buttons and deepens the primary fill without motion. Task-heading and preview-heading focus provide continuity after replacement. Evidence JPEGs are provenance-bearing records, not decorative assets. Source: [state styling](public/styles.css#L120), [evidence borders](public/styles.css#L166), [quote block](public/styles.css#L416).

## Shapes

The smaller recorded radius belongs to controls/notices; the larger belongs to panels/table wrappers. Quote blocks stay square and bordered. Buttons and native disclosure summaries have minimum height (44px); textareas start at minimum height (100px) and resize vertically. Selection source uses eight native rows. Ordered requirement lists use inset (1.5rem); native disclosure markers remain visible. Source: [forms](public/styles.css#L84), [disclosures](public/styles.css#L225), [quote selection form](public/app.js#L39).

## Components

### Buttons, Fields and Navigation

Primary and submit actions use green; secondary refresh/return/archive/selection-transfer controls use white with navy text and borders. The retained baseline is navy filled. Buttons use padding (`0.65rem 1rem`), weight (600), hover brightness (1.13), disabled opacity (0.55) and final disabled `cursor: not-allowed`. Focus-visible is an amber outline (3px) with offset (3px). The initiating asynchronous button is disabled during its request. Source: [buttons](public/styles.css#L120), [overrides](public/styles.css#L377), [request helper](public/app.js#L6).

Native fields keep connected labels, required semantics, white ground, full width, the smaller radius and blue carets. The finding form offers a read-only source textarea, native verdict select, four labelled coordinate inputs, two selection-transfer buttons, clear-boundaries action and required rationale. Coordinates use numeric input mode rather than a custom widget. Native textareas represent CRLF/CR as LF; source converts DOM selection offsets back to the preserved source. A locked finding disables edit controls while its source remains readable. Source: [field helpers](public/app.js#L9), [offset conversion](public/app.js#L37), [finding form](public/app.js#L39).

The header shows linked brand and account/role. Active collection navigation uses a white bordered button and `aria-current="page"`; inactive buttons stay transparent on Navigation Mist. Worksheets is the initial collection. The skip link appears on focus; task headings receive programmatic focus. Notices use `role="status"`, `aria-live="polite"` and a focus target; empty notices hide. Refusal turns the notice pale red. Source: [shell](public/index.html#L10), [navigation](public/app.js#L12).

### Record Table and Snapshot Disclosures

Search and archive visibility precede the flat bordered native table. Headers have `scope="col"`; values align left/top, wrap and use tabular numerals; the requirement KK cell is language-marked. A labelled focusable wrapper supplies overflow. Empty results give a written next step. Source: [collections](public/app.js#L23), [table](public/styles.css#L290).

**Полный неизменный текст** exposes complete frozen source in a native `pre`; **Точный опубликованный список** exposes code/version, title, descriptions and position-preserving bilingual requirements. They remain separate from quoted spans and current findings. Publication preview says **Предпросмотр · ещё не опубликован** before the explicit publication action; changing the chosen checklist invalidates that preview. Source: [publication](public/app.js#L28), [document](public/app.js#L31), [worksheet](public/app.js#L34).

**The Quote Boundary Rule.** Keep the full immutable source separate from exact quoted spans and their zero-based UTF-16 coordinates.

### Findings and Exact Quotes

The three written choices are **Опора в тексте**, **Не найдено** and **Конфликт двух цитат**. A supported finding shows one quote; conflicting shows two ordered, disjoint quotes; missing shows no quote and explicitly says it is a manual author mark. Each quote has **Позиции [start, end) · точная цитата** directly above its white bordered block. Coordinates start at zero in UTF-16, with inclusive start and exclusive end; the server extracts the quote. Source: [verdicts](public/app.js#L18), [finding view](public/app.js#L32), [selection form](public/app.js#L39).

**The Manual Finding Rule.** Write supported, missing and conflicting findings explicitly; status color and exact quotes do not supply a semantic verdict.

### Preview, Refusal and Immutable Report

**Полный предпросмотр · ещё не записан** leads with written `complete` or `needs_evidence`, counts and the local meaning disclaimer, then every requirement/finding. Both statuses use the same green text. Only the worksheet author receives required **Основание закрытия** and **Записать полный отчёт один раз** after that full preview. Incomplete worksheets cannot seal under the [product contract](PRODUCT.md); an unsaved preview is not a reservation or proof of human reading.

On refused save, the preview heading becomes **Запись отказала · обновите и перепроверьте**, the error notice receives focus and entered rationale remains unsaved in the form. After success, **Сохранённый полный отчёт** appears beside historical actor, time, note and digest; finding-edit and report-save controls disappear. Complete means every requirement was manually marked supported; needs_evidence means at least one missing/conflicting mark. Neither is a legal or semantic approval. Source: [report renderer](public/app.js#L33), [save/refusal/saved branches](public/app.js#L34).

**The Saved State Rule.** Call a preview unsaved, retain rationale on refusal and show a saved report only with its historical actor, time and digest.

### Documentation Examples and Scope

The [sidecar](.impeccable/design.json) supplies ten self-contained static synthetic snippets: two button variants, navigation, table, snapshot disclosure, labelled source-selection form, the three manual finding states together, unsaved closure, stale refusal and saved report. Action buttons are non-submitting and have no handlers; native fields/disclosures retain native behavior. These are documentation examples, not additional reviewed captures or executable report workflows.

[PRODUCT.md](PRODUCT.md) and the [surface contract](.impeccable/surfaces/public-app-js.md) bound this system to synthetic text in a shared staff area without tenant isolation. No live Gumloop, AI/LLM, OCR, document-upload extraction, external messages, payments or real-document outcomes are implied. JSON/digests describe consistency, not authenticity or historical authority.

## Do's and Don'ts

### Do:

- Do retain the inherited navy shell, pale ground, white native controls and green explicit actions.
- Do keep connected field labels, visible focus, native disclosure markers and column-scoped table headers.
- Do preserve authored RU/KK text, language attributes, exact quotes and source line breaks.
- Do show worksheet owner, document language, publication version and coverage before the findings.
- Do keep full source and exact published requirements in separate native disclosures.
- Do distinguish an unfilled finding, a manually missing finding and a conflicting two-quote finding.
- Do place the one-time report action after the complete preview and required closure rationale.
- Do retain unsaved rationale and change the preview heading when a write is refused.
- Do replace editing and save controls with historical actor, time, digest and frozen findings after saving.
- Do let long titles, digests, source text and quotes wrap without a fixed-height crop.

### Don't:

- Don't replace this inherited identity with ornamental media, display lettering or animation.
- Don't replace native selection, inputs, tables or disclosures with decorative imitations.
- Don't present complete, needs_evidence or an exact quote as a semantic, truth, sufficiency or legal verdict.
- Don't present a preview or a retained unsaved rationale as a saved report.
- Don't provide a non-author or administrator bypass for editing findings or sealing the report.
- Don't offer report edit, reopen, reversal or a second seal action after saving.
- Don't imply tenant isolation, live Gumloop, AI, OCR, file extraction, external messaging or real-document outcomes.
- Don't describe a digest or this bounded visual packet as authentication or security certification.
- Don't claim mobile/390px, 1440px, touch, screen-reader or exhaustive keyboard verification from the seven 1280px captures.
