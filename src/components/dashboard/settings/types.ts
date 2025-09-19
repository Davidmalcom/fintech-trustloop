export type SettingOption = {
  id: string
  label: string
  href?: string
  onClick?: () => void
}

export type SettingsMenuProps = {
  options?: SettingOption[]
}
