import os
import re
import unicodedata

currency_names = {
    'ae': 'United Arab Emirates Dirham',
    'af': 'Afghan Afghani',
    'al': 'Albanian Lek',
    'am': 'Armenian Dram',
    'ao': 'Angolan Kwanza',
    'ar': 'Argentine Peso',
    'au': 'Australian Dollar',
    'az': 'Azerbaijani Manat',
    'ba': 'Bosnia and Herzegovina Convertible Mark',
    'bb': 'Barbadian Dollar',
    'bd': 'Bangladeshi Taka',
    'bh': 'Bahraini Dinar',
    'bi': 'Burundian Franc',
    'bm': 'Bermudian Dollar',
    'bn': 'Brunei Dollar',
    'bo': 'Bolivian Boliviano',
    'br': 'Brazilian Real',
    'bs': 'Bahamian Dollar',
    'bt': 'Bhutanese Ngultrum',
    'bw': 'Botswana Pula',
    'by': 'Belarusian Ruble',
    'bz': 'Belize Dollar',
    'ca': 'Canadian Dollar',
    'cf': 'Congolese Franc',
    'ch': 'Swiss Franc',
    'cl': 'Chilean Peso',
    'cn': 'Chinese Renminbi Yuan',
    'co': 'Colombian Peso',
    'cr': 'Costa Rican Colón',
    'cu': 'Cuban Peso',
    'cv': 'Cape Verdean Escudo',
    'cz': 'Czech Koruna',
    'dj': 'Djiboutian Franc',
    'dk': 'Danish Krone',
    'do': 'Dominican Peso',
    'dz': 'Algerian Dinar',
    'eg': 'Egyptian Pound',
    'er': 'Eritrean Nakfa',
    'et': 'Ethiopian Birr',
    'fj': 'Fijian Dollar',
    'fk': 'Falkland Pound',
    'gb': 'British Pound',
    'ge': 'Georgian Lari',
    'gh': 'Ghanaian Cedi',
    'gi': 'Gibraltar Pound',
    'gm': 'Gambian Dalasi',
    'gn': 'Guinean Franc',
    'gt': 'Guatemalan Quetzal',
    'gy': 'Guyanese Dollar',
    'hk': 'Hong Kong Dollar',
    'hn': 'Honduran Lempira',
    'ht': 'Haitian Gourde',
    'hu': 'Hungarian Forint',
    'id': 'Indonesian Rupiah',
    'il': 'Israeli New Shekel',
    'in': 'Indian Rupee',
    'iq': 'Iraqi Dinar',
    'ir': 'Iranian Rial',
    'is': 'Icelandic Króna',
    'jm': 'Jamaican Dollar',
    'jo': 'Jordanian Dinar',
    'jp': 'Japanese Yen',
    'ke': 'Kenyan Shilling',
    'kg': 'Kyrgyzstani Som',
    'kh': 'Cambodian Riel',
    'km': 'Comorian Franc',
    'kp': 'North Korean Won',
    'kr': 'South Korean Won',
    'kw': 'Kuwaiti Dinar',
    'ky': 'Cayman Islands Dollar',
    'kz': 'Kazakhstani Tenge',
    'la': 'Lao Kip',
    'lb': 'Lebanese Pound',
    'lk': 'Sri Lankan Rupee',
    'lr': 'Liberian Dollar',
    'ls': 'Lesotho Loti',
    'ly': 'Libyan Dinar',
    'ma': 'Moroccan Dirham',
    'md': 'Moldovan Leu',
    'mg': 'Malagasy Ariary',
    'mk': 'Macedonian Denar',
    'mm': 'Myanmar Kyat',
    'mn': 'Mongolian Tögrög',
    'mo': 'Macanese Pataca',
    'mr': 'Mauritanian Ouguiya',
    'mu': 'Mauritian Rupee',
    'mv': 'Maldivian Rufiyaa',
    'mw': 'Malawian Kwacha',
    'mx': 'Mexican Peso',
    'my': 'Malaysian Ringgit',
    'mz': 'Mozambican Metical',
    'na': 'Namibian Dollar',
    'ng': 'Nigerian Naira',
    'ni': 'Nicaraguan Córdoba',
    'no': 'Norwegian Krone',
    'np': 'Nepalese Rupee',
    'nz': 'New Zealand Dollar',
    'om': 'Omani Rial',
    'pa': 'Panamanian Balboa',
    'pe': 'Peruvian Sol',
    'pg': 'Papua New Guinean Kina',
    'ph': 'Philippine Peso',
    'pk': 'Pakistani Rupee',
    'pl': 'Polish Złoty',
    'py': 'Paraguayan Guaraní',
    'qa': 'Qatari Riyal',
    'ro': 'Romanian Leu',
    'rs': 'Serbian Dinar',
    'ru': 'Russian Ruble',
    'rw': 'Rwandan Franc',
    'sa': 'Saudi Riyal',
    'sb': 'Solomon Islands Dollar',
    'sc': 'Seychellois Rupee',
    'sd': 'Sudanese Pound',
    'se': 'Swedish Krona',
    'sg': 'Singapore Dollar',
    'sh': 'Saint Helenian Pound',
    'so': 'Somali Shilling',
    'sr': 'Surinamese Dollar',
    'ss': 'South Sudanese Pound',
    'st': 'São Tomé and Príncipe Second Dobra',
    'sv': 'Salvadoran Colón',
    'sy': 'Syrian Pound',
    'sz': 'Swazi Lilangeni',
    'th': 'Thai Baht',
    'tj': 'Tajikistani Somoni',
    'tm': 'Turkmenistani Manat',
    'tn': 'Tunisian Dinar',
    'to': 'Tongan Paʻanga',
    'tr': 'Turkish Lira',
    'tt': 'Trinidad and Tobago Dollar',
    'tw': 'New Taiwan Dollar',
    'tz': 'Tanzanian Shilling',
    'ua': 'Ukrainian Hryvnia',
    'ug': 'Ugandan Shilling',
    'us': 'United States Dollar',
    'uy': 'Uruguayan Peso',
    'uz': 'Uzbekistan Som',
    've': 'Venezuelan Bolívar Soberano',
    'vn': 'Vietnamese Đồng',
    'vu': 'Vanuatu Vatu',
    'ws': 'Samoan Tala',
    'ye': 'Yemeni Rial',
    'za': 'South African Rand',
    'zm': 'Zambian Kwacha',
    'zw': 'Zimbabwe Gold',
}


def slugify(name: str) -> str:
    text = unicodedata.normalize('NFKD', name)
    text = ''.join(ch for ch in text if not unicodedata.combining(ch))
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text


renamed = []
for entry in sorted(os.listdir('.')):
    if not entry.endswith('.svg'):
        continue

    base = os.path.splitext(entry)[0]
    if len(base) != 2 or not re.fullmatch(r'[a-z]{2}', base):
        continue

    name = currency_names.get(base)
    if not name:
        continue

    target = slugify(name) + '.svg'
    if target == entry:
        continue
    if os.path.exists(target):
        continue

    os.rename(entry, target)
    renamed.append((entry, target))

print('RENAMED', len(renamed))
for old, new in renamed[:80]:
    print(old, '->', new)
