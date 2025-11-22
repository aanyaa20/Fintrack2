import { Separator } from "@/components/ui/separator"
import { AccountForm } from "./_components/account-form"
import { useTranslation } from "react-i18next"

const Account = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
    <div>
      <h3 className="text-lg font-medium">{t("settings.account")}</h3>
      <p className="text-sm text-muted-foreground">
        {t("settings.account_desc")}
      </p>
    </div>
    <Separator />
    <AccountForm />
  </div>

  )
}

export default Account