import { Separator } from "@/components/ui/separator"
import { AppearanceTheme } from "./_components/appearance-theme"
import { useTranslation } from "react-i18next"

const Appearance = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
    <div>
      <h3 className="text-lg font-medium">{t("settings.appearance")}</h3>
      <p className="text-sm text-muted-foreground">
        {t("settings.appearance_desc")}
      </p>
    </div>
    <Separator />
    <AppearanceTheme />
  </div>
  )
}

export default Appearance