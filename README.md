# WT Private - MUI UI

Showcase de uma página com Material UI, com paleta neutra e componentes comuns de admin.

## Stack

- Vite 8 + React 19
- Material UI 6 (`@mui/material`, `@mui/icons-material`)
- `@mui/x-date-pickers` + `dayjs`
- Tema custom em `src/theme.js` (look and feel neutro)

## Componentes da pagina

Componentes presentes na pagina principal (`/components`):

- `Sidebar` (drawer lateral com busca por pagina, menu hierarquico com `Collapse` e links)
- `AdminNavbar` (topbar principal com titulo `WT Private`, timer de sessao, acoes e menu de usuario)
- `StatCard` (renderizado via `STAT_CARDS.map`)
- `RevenueCard` (indicadores por periodo usando `LinearProgress` + `ToggleButtonGroup`)
- `OrdersByDayCard` (volume semanal com `LinearProgress`)
- `TrafficSourcesCard` (distribuicao por origem com `LinearProgress`)
- `ActivityFeedList` (renderizado via `ACTIVITY_FEED.map`)
- `DataTable` (`Pedidos recentes`) com busca, ordenacao, paginacao, filtro por status e acao `onAdd`
- `CreateOrderDialog` (`Dialog` + `form`) com submit front-only para incluir registro em `orders`
- `AdvancedActionTopbar` (`Menu` de IA, notificacoes e conta + estado de feedback)
- `OperationsGridCard` (toolbar com `opsConfigOpen`/`opsColumnsOpen`, `reorderMode`, `visibleOpsColumns`, `opsSort`)
- `SupervisorTelephonyPanel` (tabela de agentes com acoes inline e estado `selectedSupervisorAgent`)
- `SplitPanelPreview` (painel lateral com estado `splitPanelText`)
- `ButtonsShowcaseCard` (variantes de botoes `primary/secondary/outlined/success/warning/error`)
- `BadgesAndStatusPillsCard` (variantes de `Chip` e status)
- `AlertsShowcaseCard` (variantes de `Alert` informativo/sucesso/aviso/erro)
- `FaqAccordionCard` (MUI `Accordion`)

Componentes presentes na pagina de perfil (`/profile`):

- `ProfileHeader` (`Typography` com titulo/subtitulo)
- `ProfileSummaryCard` (avatar, `PROFILE.role`, metricas e acao `Trocar foto`)
- `ProfileFormCard` (card principal contendo formulario e mensagem de sucesso)
- `ProfileSuccessAlert` (render condicional via estado `saved`)
- `ProfileForm` (`Box component="form"` + `handleSubmit` + `validate`)
- `ProfileNameField` (`TextField` + helperText)
- `ProfileEmailField` (`TextField` + `InputAdornment`)
- `ProfilePhoneField` (`TextField`)
- `ProfileLanguageSelectField` (`Select`)
- `ProfileCityField` (`TextField` de texto para cidade)
- `ProfileCountrySelectField` (`Select`)
- `ProfileBioTextareaField` (`TextField multiline` + `FormHelperText`)
- `ProfileNotificationsGroup` (`notifyEmail`, `notifyPush`, `twoFactor` com `Switch`)
- `ProfileFormActions` (`Cancelar` / `Salvar alteracoes`)

Componentes presentes na pagina de login (`/login`):

- `AuthCard` (card de autenticacao)
- `AuthBrand` (marca no topo)
- `LoginErrorAlert` (render condicional via estado `error`)
- `LoginForm` (`Box component="form"` + `handleSubmit`)
- `LoginEmailField` (`TextField` + `InputAdornment`)
- `LoginPasswordField` (`TextField` + `InputAdornment`)
- `RememberMeCheckbox` (`Checkbox`)
- `ForgotPasswordLink` (`MuiLink href="#forgot"`)
- `LoginSubmitButton` (acao principal de autenticacao)
- `SignupLink` (`MuiLink component={Link} to="#signup"`)

Componentes adicionados com base no cliente:

- `RecordsPage` (bloco de relacionamentos com busca, filtro por ativos, tabela com status e acoes, total e paginacao)
- `CompanyLookupDialog` (modal "Buscar empresa" com chips de filtro, busca e tabela paginada)
- `RegionsPage` (bloco de regioes com busca por nome/codigo, listagem e acao editar)
- `AssetsPage` (bloco de ativos com busca por identificador, filtro ativos, periodo de vigencia (`type="date"`), select de tipo e tabela de status/acoes)

## Como rodar

```bash
npm install
npm run dev
```

App local: <http://localhost:3000>

Build de producao:

```bash
npm run build
npm run preview
```
