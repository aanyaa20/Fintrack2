import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
];

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select value={i18n.language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[140px] bg-white/10 border-white/20 text-white hover:bg-white/20 focus:ring-0 focus:ring-offset-0">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <div className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
