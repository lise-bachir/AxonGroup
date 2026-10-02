/* ==========================================================================
   ✏️ CATALOGUE AXON GROUP — c'est ici que vous gérez tous vos produits.

   Pour AJOUTER un produit, copiez une ligne et modifiez-la :
     P("catégorie", "Marque", "Nom du modèle", ["caractéristique 1", "caractéristique 2", ...], "VL")

   • catégorie : une des valeurs de CATS ci-dessous (ex. "laptops", "cctv")
   • "VL"  = disponible à la Vente ET à la Location · "V" = vente seule · "L" = location seule
   • Pour mettre une PHOTO : déposez l'image dans assets/produits/ et ajoutez son chemin
     en dernier paramètre : P("laptops", "HP", "ProBook 450 G10", [...], "VL", "assets/produits/probook-450.jpg")
   • Pour SUPPRIMER un produit : effacez sa ligne.
   Aucun prix n'est affiché : les prix sont donnés dans le devis.
   ========================================================================== */

const CATS = [
  { id: "smartphones", label: "Smartphones",                  icon: "phone" },
  { id: "laptops",     label: "Ordinateurs portables",        icon: "laptop" },
  { id: "gaming",      label: "PC Gamer",                     icon: "gaming" },
  { id: "desktops",    label: "PC fixes et tout-en-un",       icon: "desktop" },
  { id: "tablets",     label: "Tablettes",                    icon: "tablet" },
  { id: "printers",    label: "Imprimantes",                  icon: "printer" },
  { id: "peripherals", label: "Souris, claviers, accessoires",icon: "mouse" },
  { id: "storage",     label: "Disques et stockage",          icon: "storage" },
  { id: "cables",      label: "Câbles certifiés",             icon: "plug" },
  { id: "wifi",        label: "Points d'accès Wi-Fi",         icon: "wifi" },
  { id: "switches",    label: "Switchs",                      icon: "switch" },
  { id: "routers",     label: "Routeurs et pare-feu",         icon: "shield" },
  { id: "cctv",        label: "Vidéosurveillance",            icon: "camera" },
  { id: "access",      label: "Contrôle d'accès et pointage", icon: "face" },
  { id: "netcabling",  label: "Câblage réseau",               icon: "rack" },
  { id: "electrical",  label: "Câblage électrique et énergie",icon: "bolt" },
];

const slug = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const P = (cat, brand, name, specs, modes = "VL", img = "") => ({
  id: slug(`${brand} ${name}`), cat, brand, name, specs,
  vente: modes.includes("V"), location: modes.includes("L"), img,
});

const PRODUCTS = [
  /* ---------- Smartphones ---------- */
  P("smartphones", "Apple", "iPhone 17 Pro", ["Écran Super Retina XDR 6,3\" 120 Hz", "Puce A19 Pro", "Triple capteur photo 48 Mpx", "5G, eSIM, USB-C"]),
  P("smartphones", "Apple", "iPhone 17", ["Écran Super Retina XDR 6,3\" 120 Hz", "Puce A19", "Double capteur photo 48 Mpx", "5G, eSIM, USB-C"]),
  P("smartphones", "Apple", "iPhone 16", ["Écran Super Retina XDR 6,1\"", "Puce A18", "Double capteur photo 48 Mpx", "5G, USB-C"]),
  P("smartphones", "Samsung", "Galaxy S25 Ultra", ["Écran Dynamic AMOLED 2X 6,9\" 120 Hz", "Snapdragon 8 Elite, 12 Go de RAM", "Capteur principal 200 Mpx, S Pen", "5G, Galaxy AI"]),
  P("smartphones", "Samsung", "Galaxy S25", ["Écran Dynamic AMOLED 2X 6,2\" 120 Hz", "Snapdragon 8 Elite", "Triple capteur photo 50 Mpx", "5G, Galaxy AI"]),
  P("smartphones", "Samsung", "Galaxy A56 5G", ["Écran Super AMOLED 6,7\" 120 Hz", "Batterie 5 000 mAh", "Triple capteur photo 50 Mpx", "5G"]),
  P("smartphones", "Samsung", "Galaxy A36 5G", ["Écran Super AMOLED 6,7\" 120 Hz", "Batterie 5 000 mAh", "Triple capteur photo 50 Mpx", "5G"]),
  P("smartphones", "Samsung", "Galaxy A16", ["Écran Super AMOLED 6,7\"", "Batterie 5 000 mAh", "Capteur principal 50 Mpx", "Double SIM"]),
  P("smartphones", "Huawei", "Mate 60 Pro", ["Écran OLED LTPO 6,82\" 120 Hz", "Processeur Kirin 9000S", "Triple capteur photo 50 Mpx", "Charge rapide 88 W"]),
  P("smartphones", "Huawei", "Pura 70 Pro", ["Écran OLED LTPO 6,8\" 120 Hz", "Triple capteur photo 50 Mpx", "Charge rapide 100 W filaire", "Design en verre premium"]),
  P("smartphones", "Huawei", "nova (gamme)", ["Grand écran OLED", "Charge rapide", "Excellent rapport qualité-prix", "Modèle précisé dans le devis"]),

  /* ---------- Ordinateurs portables ---------- */
  P("laptops", "HP", "ProBook 450 G10", ["Écran 15,6\" Full HD", "Intel Core i5 / i7 (13e génération)", "RAM 8 à 16 Go, SSD NVMe", "Wi-Fi 6E, Windows 11 Pro"]),
  P("laptops", "HP", "EliteBook 840 G10", ["Écran 14\" WUXGA", "Intel Core i5 / i7 vPro", "Robuste, certifié MIL-STD 810H", "Sécurité professionnelle HP Wolf"]),
  P("laptops", "HP", "250 G10", ["Écran 15,6\" Full HD", "Intel Core i3 / i5", "Idéal bureautique et études", "Clavier avec pavé numérique"]),
  P("laptops", "HP", "Pavilion 15", ["Écran 15,6\" Full HD", "Intel Core i5 / Ryzen 5", "SSD NVMe", "Design fin et léger"]),
  P("laptops", "Lenovo", "ThinkPad E14 Gen 6", ["Écran 14\" WUXGA", "Intel Core Ultra 5 / 7", "RAM jusqu'à 32 Go, SSD NVMe", "Clavier ThinkPad, Wi-Fi 6E"]),
  P("laptops", "Lenovo", "ThinkPad T14 Gen 5", ["Écran 14\" WUXGA", "Intel Core Ultra", "Robuste, certifié MIL-STD 810H", "Idéal pour les professionnels"]),
  P("laptops", "Lenovo", "ThinkPad X1 Carbon Gen 12", ["Écran 14\" haute définition", "Intel Core Ultra", "Ultra-léger (environ 1,1 kg)", "Gamme premium professionnelle"]),
  P("laptops", "Lenovo", "ThinkBook 16 G7 IML", ["Écran 16\" WUXGA", "Intel Core Ultra 7", "RAM 16 Go, SSD 512 Go", "Wi-Fi 6E, grand écran de travail"]),
  P("laptops", "Lenovo", "IdeaPad Slim 3 15", ["Écran 15,6\" Full HD", "Intel Core i5 / Ryzen 5", "SSD NVMe", "Léger, polyvalent"]),
  P("laptops", "ASUS", "Vivobook 15", ["Écran 15,6\" Full HD", "Intel Core i5 / Ryzen 5", "SSD NVMe", "Idéal bureautique et études"]),
  P("laptops", "ASUS", "ExpertBook B1", ["Écran 14\" / 15,6\"", "Intel Core i5 / i7", "Robuste, certifié MIL-STD 810H", "Conçu pour les entreprises"]),
  P("laptops", "ASUS", "Zenbook 14 OLED", ["Écran OLED 14\" haute définition", "Intel Core Ultra 7", "Ultra-fin, environ 1,2 kg", "Charge rapide USB-C"]),

  /* ---------- PC Gamer ---------- */
  P("gaming", "HP", "OMEN 16", ["Écran 16\" Full HD haute fréquence", "Intel Core i7 / Ryzen 7", "NVIDIA GeForce RTX série 40", "Refroidissement renforcé"]),
  P("gaming", "HP", "Victus 16", ["Écran 16\" Full HD 144 Hz", "Intel Core i5 / Ryzen 5", "NVIDIA GeForce RTX", "Bon rapport performances-prix"]),
  P("gaming", "Lenovo", "Legion 5i", ["Écran 15,6\" / 16\" 165 Hz", "Intel Core i7", "NVIDIA GeForce RTX 4060", "Clavier rétroéclairé, refroidissement Legion"]),
  P("gaming", "Lenovo", "LOQ 15", ["Écran 15,6\" Full HD 144 Hz", "Intel Core i5 / i7", "NVIDIA GeForce RTX", "Entrée de gamme gaming"]),
  P("gaming", "ASUS", "ROG Strix G16", ["Écran 16\" 165 Hz", "Intel Core i7 / i9", "NVIDIA GeForce RTX 4060 / 4070", "Clavier RGB"]),
  P("gaming", "ASUS", "TUF Gaming A15", ["Écran 15,6\" 144 Hz", "AMD Ryzen 7", "NVIDIA GeForce RTX", "Robuste, certifié MIL-STD 810H"]),
  P("gaming", "ASUS", "ROG Zephyrus G14", ["Écran OLED 14\" 120 Hz", "AMD Ryzen AI 9", "NVIDIA GeForce RTX", "Compact et performant"]),

  /* ---------- PC fixes et tout-en-un ---------- */
  P("desktops", "HP", "ProDesk 400 G9 SFF", ["Format compact (SFF)", "Intel Core i5 (12e génération)", "RAM 8 à 16 Go, SSD NVMe", "Windows 11 Pro"]),
  P("desktops", "HP", "All-in-One 24", ["Écran 23,8\" Full HD", "Intel Core i5 / Ryzen 5", "Webcam et haut-parleurs intégrés", "Gain de place sur le bureau"]),
  P("desktops", "Lenovo", "ThinkCentre M70s", ["Format tour compact", "Intel Core i5 / i7", "RAM jusqu'à 64 Go, SSD NVMe", "Gamme professionnelle fiable"]),
  P("desktops", "Lenovo", "ThinkCentre Tiny M70q", ["Mini PC ultra-compact (1 litre)", "Intel Core i5", "Fixation derrière un écran", "Silencieux et économe"]),
  P("desktops", "Lenovo", "IdeaCentre AIO 3", ["Écran 23,8\" / 27\" Full HD", "Intel Core i5 / Ryzen 5", "Webcam intégrée", "Design épuré"]),
  P("desktops", "ASUS", "ExpertCenter D5 Tower", ["Format tour", "Intel Core i5 / i7", "Évolutif (RAM, stockage)", "Pour la bureautique intensive"]),

  /* ---------- Tablettes ---------- */
  P("tablets", "Apple", "iPad (puce A16)", ["Écran Liquid Retina 11\"", "Puce A16", "Wi-Fi ou Wi-Fi + 5G", "Compatible Apple Pencil"]),
  P("tablets", "Apple", "iPad Air 11\" (puce M3)", ["Écran Liquid Retina 11\"", "Puce Apple M3", "Wi-Fi ou Wi-Fi + 5G", "Compatible Apple Pencil Pro"]),
  P("tablets", "Samsung", "Galaxy Tab S10 FE", ["Écran 10,9\" 90 Hz", "S Pen inclus", "Étanche IP68", "Wi-Fi ou 5G"]),
  P("tablets", "Samsung", "Galaxy Tab A9+", ["Écran 11\" 90 Hz", "Wi-Fi ou 5G", "Légère et abordable", "Idéale pour la famille et l'école"]),
  P("tablets", "Huawei", "MatePad 11.5", ["Écran 11,5\" 120 Hz", "Grande autonomie", "Wi-Fi", "Compatible stylet M-Pencil"]),

  /* ---------- Imprimantes ---------- */
  P("printers", "HP", "LaserJet Pro M404dn", ["Laser monochrome A4", "Jusqu'à 38 pages/min", "Recto-verso automatique", "Réseau Ethernet"]),
  P("printers", "HP", "LaserJet Pro MFP M428fdw", ["Multifonction laser monochrome", "Impression, copie, scan, fax", "Recto-verso, Wi-Fi", "Chargeur automatique de documents"]),
  P("printers", "HP", "Color LaserJet Pro MFP M479fdw", ["Multifonction laser couleur", "Impression, copie, scan, fax", "Recto-verso, Wi-Fi", "Écran tactile"]),
  P("printers", "HP", "Smart Tank 580", ["Imprimante à réservoirs d'encre", "Multifonction couleur 3 en 1", "Wi-Fi", "Très faible coût par page"]),
  P("printers", "Canon", "i-SENSYS LBP6030", ["Laser monochrome compacte", "Impression rapide, A4", "USB", "Idéale petit bureau"]),
  P("printers", "Canon", "i-SENSYS MF3010", ["Multifonction laser monochrome", "Impression, copie, scan", "Compacte et économique", "USB"]),
  P("printers", "Canon", "i-SENSYS MF445dw", ["Multifonction laser monochrome", "Recto-verso, Wi-Fi", "Écran tactile", "Chargeur automatique de documents"]),
  P("printers", "Canon", "PIXMA G3430", ["Imprimante à réservoirs d'encre MegaTank", "Multifonction couleur 3 en 1", "Wi-Fi", "Très faible coût par page"]),

  /* ---------- Souris, claviers, accessoires ---------- */
  P("peripherals", "Logitech", "MX Master 3S", ["Souris sans fil ergonomique", "Capteur 8 000 dpi, clics silencieux", "Multi-appareils (Bluetooth)", "Recharge USB-C"]),
  P("peripherals", "Logitech", "MX Keys S", ["Clavier sans fil rétroéclairé", "Frappe précise et confortable", "Multi-appareils (Bluetooth)", "Recharge USB-C"]),
  P("peripherals", "Logitech", "MK270 (clavier + souris)", ["Combo sans fil", "Récepteur USB unique", "Longue autonomie", "Pour le bureau"]),
  P("peripherals", "Logitech", "C920 HD Pro", ["Webcam Full HD 1080p", "Micro stéréo intégré", "Correction automatique de la lumière", "Visioconférence"]),
  P("peripherals", "Logitech", "M185", ["Souris sans fil compacte", "Récepteur USB nano", "Jusqu'à 12 mois d'autonomie", "Ambidextre"]),
  P("peripherals", "HP", "Combo clavier + souris 235", ["Combo sans fil", "Récepteur USB unique", "Discret et fin", "Pour le bureau"]),
  P("peripherals", "Lenovo", "Souris USB compacte", ["Souris filaire", "Résolution 2 400 dpi", "Compacte", "Compatible tous PC"]),
  P("peripherals", "Jabra", "Evolve2 40", ["Casque professionnel USB", "Microphone avec réduction de bruit", "Compatible Teams et Zoom", "Confortable toute la journée"]),

  /* ---------- Disques et stockage ---------- */
  P("storage", "Seagate", "Barracuda 2 To (3,5\")", ["Disque dur interne SATA", "7 200 tr/min", "Capacité 2 To", "Pour PC fixes"], "V"),
  P("storage", "Seagate", "Expansion Portable 2 To", ["Disque dur externe USB 3.0", "Capacité 2 To", "Plug and play", "Format de poche"], "V"),
  P("storage", "Western Digital", "Elements Portable 2 To", ["Disque dur externe USB 3.0", "Capacité 2 To", "Compatible Windows", "Format de poche"], "V"),
  P("storage", "Western Digital", "Blue SN580 1 To", ["SSD interne NVMe M.2", "PCIe 4.0", "Jusqu'à 4 150 Mo/s en lecture", "Capacité 1 To"], "V"),
  P("storage", "Samsung", "990 EVO 1 To", ["SSD interne NVMe M.2", "PCIe 4.0 / 5.0", "Jusqu'à 5 000 Mo/s en lecture", "Capacité 1 To"], "V"),
  P("storage", "Samsung", "870 EVO 1 To", ["SSD interne SATA 2,5\"", "Jusqu'à 560 Mo/s", "Fiabilité reconnue", "Capacité 1 To"], "V"),
  P("storage", "Samsung", "T7 Portable SSD 1 To", ["SSD externe USB 3.2 Gen 2", "Jusqu'à 1 050 Mo/s", "Boîtier métal compact", "Capacité 1 To"], "V"),
  P("storage", "Kingston", "A400 480 Go", ["SSD interne SATA 2,5\"", "Jusqu'à 500 Mo/s", "Pour moderniser un PC", "Capacité 480 Go"], "V"),
  P("storage", "Kingston", "DataTraveler Exodia M 64 Go", ["Clé USB 3.2", "Capacité 64 Go", "Capuchon de protection", "Pratique au quotidien"], "V"),

  /* ---------- Câbles certifiés ---------- */
  P("cables", "Belkin", "Câble HDMI 2.1 Ultra High Speed", ["Certifié HDMI Ultra High Speed", "48 Gbit/s, 8K / 4K 120 Hz", "Compatible consoles et TV récentes", "Longueurs au choix"], "V"),
  P("cables", "Belkin", "Câble Thunderbolt 4", ["Certifié Thunderbolt 4", "40 Gbit/s, charge jusqu'à 100 W", "Vidéo 8K, données, alimentation", "Un seul câble pour tout"], "V"),
  P("cables", "Belkin", "Câble USB-C 100 W", ["Certifié USB-IF", "Charge rapide jusqu'à 100 W", "Données USB 2.0", "Gaine renforcée"], "V"),
  P("cables", "Belkin", "Câble USB-C vers Lightning (MFi)", ["Certifié Apple MFi", "Charge rapide iPhone / iPad", "Transfert de données", "Gaine renforcée"], "V"),
  P("cables", "Club3D", "Câble DisplayPort 1.4 certifié VESA", ["Certifié VESA DisplayPort 1.4", "Jusqu'à 8K à 60 Hz", "HDR, 32,4 Gbit/s", "Idéal écrans professionnels et gaming"], "V"),
  P("cables", "Anker", "Câble USB-C vers USB-C 100 W", ["Certifié USB-IF", "Charge rapide jusqu'à 100 W", "Tressé, très résistant", "Longueurs au choix"], "V"),

  /* ---------- Points d'accès Wi-Fi ---------- */
  P("wifi", "Ubiquiti", "UniFi U6 Lite", ["Wi-Fi 6 (AX1500)", "Alimentation PoE", "Pour bureaux et petits locaux", "Gestion centralisée UniFi"]),
  P("wifi", "Ubiquiti", "UniFi U6 Pro", ["Wi-Fi 6 double bande (AX5400)", "Alimentation PoE", "Environ 300 appareils connectés", "Gestion centralisée UniFi"]),
  P("wifi", "Ubiquiti", "UniFi U6 Long-Range", ["Wi-Fi 6 longue portée", "Alimentation PoE", "Grande couverture", "Gestion centralisée UniFi"]),
  P("wifi", "Ubiquiti", "UniFi U7 Pro", ["Wi-Fi 7 tri-bande", "Port 2,5 GbE, alimentation PoE+", "Très haut débit", "Gestion centralisée UniFi"]),
  P("wifi", "Huawei", "AirEngine 5761-11", ["Wi-Fi 6 (802.11ax)", "Alimentation PoE", "Pour entreprises et hôtels", "Administration centralisée"]),
  P("wifi", "TP-Link", "Omada EAP610", ["Wi-Fi 6 (AX1800)", "Montage plafond, PoE", "Gestion centralisée Omada", "Pour bureaux et commerces"]),
  P("wifi", "TP-Link", "Omada EAP670", ["Wi-Fi 6 (AX5400)", "Port 2,5 GbE, PoE+", "Gestion centralisée Omada", "Pour zones à forte densité"]),
  P("wifi", "D-Link", "DAP-2610", ["Wi-Fi AC1300 Wave 2", "Alimentation PoE", "Montage plafond", "Pour PME"]),
  P("wifi", "Fortinet", "FortiAP 231F", ["Wi-Fi 6 pour l'intérieur", "Alimentation PoE", "Sécurité intégrée Fortinet", "Pilotage par FortiGate"]),

  /* ---------- Switchs ---------- */
  P("switches", "TP-Link", "TL-SG108", ["8 ports Gigabit", "Non administrable (plug and play)", "Boîtier métal", "Pour petit réseau"]),
  P("switches", "TP-Link", "TL-SG1016PE", ["16 ports Gigabit dont 8 PoE+", "Easy Smart administrable", "Format rackable 19\"", "Idéal caméras et bornes Wi-Fi"]),
  P("switches", "TP-Link", "Omada SG2428P", ["24 ports Gigabit PoE+", "Administrable niveau 2+", "Gestion centralisée Omada", "Format rackable 19\""]),
  P("switches", "D-Link", "DGS-1100-08P", ["8 ports Gigabit dont ports PoE", "Smart administrable", "Format compact", "Idéal petits sites"]),
  P("switches", "D-Link", "DGS-1210-28", ["24 ports Gigabit + 4 ports SFP", "Smart administrable", "Format rackable 19\"", "Pour PME"]),
  P("switches", "Cisco", "Catalyst 1000 (C1000-24T-4G-L)", ["24 ports Gigabit + 4 ports SFP", "Administrable", "Fiabilité Cisco", "Format rackable 19\""]),
  P("switches", "Cisco", "Catalyst 1000 PoE (C1000-24P-4G-L)", ["24 ports Gigabit PoE+", "4 ports SFP", "Administrable", "Idéal caméras et bornes Wi-Fi"]),
  P("switches", "Cisco", "Business CBS250-24T-4G", ["24 ports Gigabit + 4 ports SFP", "Smart administrable", "Gestion simplifiée", "Format rackable 19\""]),
  P("switches", "Fortinet", "FortiSwitch 108F-POE", ["8 ports Gigabit PoE+", "Géré par FortiGate", "Sécurité intégrée", "Format compact"]),

  /* ---------- Routeurs et pare-feu ---------- */
  P("routers", "Fortinet", "FortiGate 40F", ["Pare-feu nouvelle génération", "Pour petits sites et agences", "VPN et filtrage web", "Ports Gigabit"]),
  P("routers", "Fortinet", "FortiGate 60F", ["Pare-feu nouvelle génération", "Environ 10 ports Gigabit", "VPN, filtrage web, SD-WAN", "Pour PME"]),
  P("routers", "TP-Link", "Omada ER605", ["Routeur VPN multi-WAN", "Ports Gigabit", "Gestion centralisée Omada", "Pour PME"]),
  P("routers", "TP-Link", "Omada ER7206", ["Routeur VPN Gigabit multi-WAN", "Haute performance", "Gestion centralisée Omada", "Pour entreprises"]),
  P("routers", "D-Link", "DSR-1000AC", ["Routeur VPN unifié", "Wi-Fi AC intégré", "Pare-feu et filtrage", "Pour PME"]),
  P("routers", "Cisco", "ISR 1100 (C1111-8P)", ["Routeur d'agence", "Ports Gigabit PoE", "Sécurité et VPN", "Fiabilité Cisco"]),

  /* ---------- Vidéosurveillance ---------- */
  P("cctv", "Hikvision", "DS-2CD2143G2-I (dôme IP 4 Mpx)", ["Caméra dôme IP 4 Mpx AcuSense", "Vision nocturne infrarouge 40 m", "Détection humain / véhicule", "Étanche IP67"]),
  P("cctv", "Hikvision", "DS-2CD2T47G2-L (ColorVu 4 Mpx)", ["Caméra bullet IP 4 Mpx ColorVu", "Image en couleur 24h/24", "Lumière blanche intégrée", "Étanche IP67"]),
  P("cctv", "Hikvision", "DS-2CD2347G2-LU (ColorVu audio)", ["Caméra bullet IP 4 Mpx ColorVu", "Micro intégré", "Image en couleur 24h/24", "Étanche IP67"]),
  P("cctv", "Hikvision", "DS-2DE2A404IW-DE3 (PTZ 4 Mpx)", ["Caméra motorisée PTZ 4 Mpx", "Zoom optique x4", "Vision nocturne infrarouge", "Pour grandes zones"]),
  P("cctv", "Hikvision", "DS-2CE76D0T-ITMF (dôme Turbo HD)", ["Caméra dôme analogique HD 2 Mpx", "Vision nocturne infrarouge", "Compatible enregistreurs DVR Turbo HD", "Solution économique"]),
  P("cctv", "Hikvision", "DS-2CE16D0T-IRF (bullet Turbo HD)", ["Caméra bullet analogique HD 2 Mpx", "Vision nocturne infrarouge", "Compatible enregistreurs DVR Turbo HD", "Étanche"]),
  P("cctv", "Hikvision", "DS-7604NI-K1/4P (NVR 4 voies PoE)", ["Enregistreur NVR 4 voies", "4 ports PoE intégrés", "Résolution jusqu'à 4K", "1 disque dur"]),
  P("cctv", "Hikvision", "DS-7608NI-K2/8P (NVR 8 voies PoE)", ["Enregistreur NVR 8 voies", "8 ports PoE intégrés", "Résolution jusqu'à 4K", "2 disques durs"]),
  P("cctv", "Hikvision", "DS-7732NI-K4 (NVR 32 voies)", ["Enregistreur NVR 32 voies", "Résolution jusqu'à 4K", "4 disques durs", "Pour grands sites"]),
  P("cctv", "Hikvision", "DS-7204HQHI-K1 (DVR 4 voies)", ["Enregistreur DVR Turbo HD 4 voies", "Compatible caméras analogiques HD", "1 disque dur", "Solution économique"]),
  P("cctv", "Seagate", "SkyHawk 4 To", ["Disque dur pour vidéosurveillance", "Conçu pour fonctionner 24h/24", "Capacité 4 To", "Compatible NVR / DVR"], "V"),
  P("cctv", "Western Digital", "Purple 4 To", ["Disque dur pour vidéosurveillance", "Conçu pour fonctionner 24h/24", "Capacité 4 To", "Compatible NVR / DVR"], "V"),

  /* ---------- Contrôle d'accès et pointage ---------- */
  P("access", "Hikvision", "DS-K1T341AM (reconnaissance faciale)", ["Terminal facial 4,3\"", "Contrôle d'accès et pointage", "Carte Mifare, mot de passe", "Pour bureaux et entreprises"]),
  P("access", "Hikvision", "DS-K1T671M (terminal facial 7\")", ["Terminal facial écran 7\"", "Contrôle d'accès et pointage", "Reconnaissance rapide", "Pour entrées principales"]),
  P("access", "Hikvision", "DS-K1T804AMF (empreinte + badge)", ["Terminal à empreinte digitale", "Lecteur de badge Mifare", "Contrôle d'accès et pointage", "Utilisation intérieure et extérieure"]),
  P("access", "Hikvision", "DS-K2604T (contrôleur 4 portes)", ["Contrôleur d'accès 4 portes", "Réseau TCP/IP", "Pour installations multi-portes", "Compatible lecteurs Hikvision"], "V"),
  P("access", "Hikvision", "DS-K1102M (lecteur de badge)", ["Lecteur de cartes Mifare 13,56 MHz", "Étanche, usage extérieur", "Sortie Wiegand / RS-485", "S'ajoute à un contrôleur"], "V"),

  /* ---------- Câblage réseau ---------- */
  P("netcabling", "Legrand", "Câble Cat6 U/UTP (bobine 305 m)", ["Catégorie 6, 4 paires", "Bobine de 305 m", "Pour câblage horizontal", "Gaine LSZH"], "V"),
  P("netcabling", "Nexans", "LANmark Cat6A F/FTP (bobine 500 m)", ["Catégorie 6A blindé F/FTP", "Jusqu'à 10 Gbit/s", "Pour installations exigeantes", "Gaine LSZH"], "V"),
  P("netcabling", "Legrand", "Prise RJ45 Cat6 (keystone)", ["Prise murale RJ45 catégorie 6", "Compatible blindé et non blindé", "Montage rapide", "Plusieurs coloris"], "V"),
  P("netcabling", "Legrand", "Panneau de brassage 24 ports Cat6", ["Panneau 24 ports, format 1U", "Catégorie 6", "Pour baie 19\"", "Repérage des ports"], "V"),
  P("netcabling", "Nexans", "Baie de brassage 19\" murale 9U / 12U", ["Coffret mural 19\"", "Porte vitrée verrouillable", "Ventilation", "Pour locaux techniques"], "V"),
  P("netcabling", "Nexans", "Jarretière RJ45 Cat6A S/FTP", ["Catégorie 6A blindée S/FTP", "Longueurs 0,5 à 5 m", "Gaine LSZH", "Certifiée"], "V"),
  P("netcabling", "Nexans", "Jarretière fibre optique LC/LC", ["Fibre optique OS2 monomode", "Connecteurs LC/LC duplex", "Longueurs au choix", "Pour liaisons entre baies"], "V"),

  /* ---------- Câblage électrique et énergie ---------- */
  P("electrical", "Nexans", "Câble H07V-K (1,5 / 2,5 / 6 mm²)", ["Fil de câblage souple", "Section au choix", "Plusieurs coloris", "Pour installations intérieures"], "V"),
  P("electrical", "Nexans", "Câble U-1000 R2V (3G2,5 mm²)", ["Câble d'alimentation rigide", "3 conducteurs, 2,5 mm²", "Pour distribution électrique", "Usage intérieur / enterré"], "V"),
  P("electrical", "Legrand", "Disjoncteurs modulaires DX³", ["Protection des circuits", "Calibres 10 à 63 A", "Montage sur rail DIN", "Fiabilité reconnue"], "V"),
  P("electrical", "Schneider Electric", "Acti9 (disjoncteurs et différentiels)", ["Protection des personnes et des circuits", "Calibres au choix", "Montage sur rail DIN", "Gamme professionnelle"], "V"),
  P("electrical", "Legrand", "Coffret électrique", ["Coffret de distribution modulaire", "Capacité selon besoin", "Porte transparente", "Pour locaux professionnels"], "V"),
  P("electrical", "APC", "Back-UPS BX1600MI (1 600 VA)", ["Onduleur 1 600 VA", "Protection contre les coupures", "Idéal postes et réseau", "Régulation de tension AVR"]),
  P("electrical", "APC", "Smart-UPS SMT1500I (1 500 VA)", ["Onduleur line-interactive 1 500 VA", "Écran LCD", "Batterie remplaçable", "Idéal serveurs et réseau"]),
  P("electrical", "APC", "Essential SurgeArrest (multiprise parafoudre)", ["Multiprise avec parafoudre", "Protège contre les surtensions", "Plusieurs prises", "Pour postes de travail"], "V"),
];
