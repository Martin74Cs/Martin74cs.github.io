/**
 * Represents the detailed content for a selected navigation item.
 * This type now also serves as the definition for navigation items in the sidebar.
 */
export interface ContentDetail {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  url?: string; // Nové pole pro URL, pokud se má zobrazit externí stránka
  additionalInfo?: string; // Nové pole pro sekci "Další informace"
}