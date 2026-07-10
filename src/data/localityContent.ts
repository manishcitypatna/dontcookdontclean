/**
 * All 73 Patna localities from src/data/localities.ts now have a page. The first
 * 21 (Boring Road through Saguna More) are backed by the original mock worker
 * set with named workers and photos. The remaining ones (added 2026-07-10) are
 * placeholder coverage with photoUrl: null — replace with real worker records
 * in src/data/workers.ts as onboarding reaches each locality.
 */
export const LOCALITY_CONTENT: Record<string, { intro: string; nearby: string[] }> = {
  "Boring Road": {
    intro:
      "Boring Road is one of Patna's busiest residential and commercial stretches, home to a dense mix of apartments, independent houses, and working families. We regularly place verified maids, cooks, and babysitters with households here, from the main Boring Road Chauraha through the lanes around it.",
    nearby: ["Patliputra Colony", "New Patliputra Colony", "Sri Krishna Puri (SK Puri)"],
  },
  "Kankarbagh": {
    intro:
      "Kankarbagh is one of Patna's largest residential colonies, with a mix of joint families, working couples, and multi-storey apartments. It's one of our most active areas for full-time and live-in placements — cooking, cleaning, and elder care are the most requested services here.",
    nearby: ["Rajendra Nagar", "Hanuman Nagar", "Kadamkuan"],
  },
  "Rajendra Nagar": {
    intro:
      "Rajendra Nagar is a well-established residential locality near Rajendra Nagar Terminal, with a steady demand for part-time cooks and daily house help from families living in its mix of older houses and newer flats.",
    nearby: ["Kankarbagh", "Patliputra Colony", "Kadamkuan"],
  },
  "Patliputra Colony": {
    intro:
      "Patliputra Colony is one of Patna's more planned, upscale residential colonies, known for wide roads and independent bungalows. Families here often look for full-time or live-in help for cooking, cleaning, and childcare, and we keep a steady pool of verified helpers matched to the area.",
    nearby: ["Boring Road", "New Patliputra Colony", "Rajendra Nagar"],
  },
  "Ashiana Nagar": {
    intro:
      "Ashiana Nagar, off the Boring Road–Digha stretch, is a growing residential pocket with newer apartment complexes. We place helpers here for daily cleaning, cooking, and babysitting, typically matched from nearby localities as well.",
    nearby: ["Digha", "Boring Road", "Patliputra Colony"],
  },
  "Kidwaipuri": {
    intro:
      "Kidwaipuri is a central, well-settled residential locality close to Bailey Road, with a mix of government housing and private homes. Elder care and full-time cooking help are among the most common requests we get from families here.",
    nearby: ["Bailey Road (Nehru Path)", "Sri Krishna Puri (SK Puri)", "Exhibition Road"],
  },
  "Sri Krishna Puri (SK Puri)": {
    intro:
      "Sri Krishna Puri, known locally as SK Puri, is a leafy, established residential locality near Boring Road and Bailey Road. Families here commonly hire verified helpers for full-time cooking, cleaning, and childcare.",
    nearby: ["Boring Road", "Kidwaipuri", "Bailey Road (Nehru Path)"],
  },
  "Digha": {
    intro:
      "Digha, along the Ganges in west Patna, has grown quickly with new housing developments in recent years. We connect Digha households with verified maids and cooks, many of whom also serve the neighbouring Ashiana Nagar and Saguna More areas.",
    nearby: ["Ashiana Nagar", "Saguna More", "Gola Road"],
  },
  "Gola Road": {
    intro:
      "Gola Road, on the way toward Danapur and Saguna More, is one of Patna's fastest-growing residential belts. Demand here is strong for daily and part-time domestic help as new housing societies fill up.",
    nearby: ["Saguna More", "Danapur", "Digha"],
  },
  "New Patliputra Colony": {
    intro:
      "New Patliputra Colony, an extension of the original Patliputra Colony, is a quieter residential pocket popular with families looking for reliable, long-term domestic help rather than frequent turnover.",
    nearby: ["Patliputra Colony", "Boring Road", "Rajendra Nagar"],
  },
  "Hanuman Nagar": {
    intro:
      "Hanuman Nagar is a central residential locality close to Kankarbagh, with a good mix of independent houses and small apartment blocks. We place cooks and cleaning staff here regularly, often shared across nearby households.",
    nearby: ["Kankarbagh", "Shastrinagar", "Kadamkuan"],
  },
  "Shastrinagar": {
    intro:
      "Shastrinagar, near Patna Junction, is a busy, centrally located residential area. Families here often need help that fits around irregular work hours, so part-time and daily arrangements are especially common.",
    nearby: ["Kadamkuan", "Hanuman Nagar", "Raja Bazar"],
  },
  "Danapur": {
    intro:
      "Danapur, on the western edge of Patna and home to a large cantonment, has its own steady demand for verified domestic help — especially live-in cooks and elder care, given the number of defence and service families based here.",
    nearby: ["Saguna More", "Gola Road", "Bailey Road (Nehru Path)"],
  },
  "Bailey Road (Nehru Path)": {
    intro:
      "Bailey Road (Nehru Path) is one of Patna's major arterial roads, lined with government housing, private colonies, and newer apartments stretching from Kidwaipuri out toward Danapur. It's one of our busiest corridors for verified helper placements.",
    nearby: ["Kidwaipuri", "Sri Krishna Puri (SK Puri)", "Danapur"],
  },
  "Bhoothnath Road": {
    intro:
      "Bhoothnath Road, near the Bhoothnath Mandir area, is a mixed residential-commercial locality where we regularly place cooks and cleaning help with nearby households and small businesses alike.",
    nearby: ["Exhibition Road", "Fraser Road", "Raja Bazar"],
  },
  "Exhibition Road": {
    intro:
      "Exhibition Road, close to Gandhi Maidan in central Patna, is a busy commercial and residential stretch. Families and working professionals here often need flexible, part-time domestic help.",
    nearby: ["Fraser Road", "Bhoothnath Road", "Kidwaipuri"],
  },
  "Fraser Road": {
    intro:
      "Fraser Road, one of Patna's oldest and busiest commercial streets near Patna Junction, has a mix of older residences above shops and nearby housing. We match households here with verified cooks and cleaning staff.",
    nearby: ["Exhibition Road", "Bhoothnath Road", "Raja Bazar"],
  },
  "Kadamkuan": {
    intro:
      "Kadamkuan is one of central Patna's older, densely populated residential localities. With many multi-generational households, elder care and full-time cooking help are especially in demand here.",
    nearby: ["Rajendra Nagar", "Shastrinagar", "Kankarbagh"],
  },
  "Nageshwar Colony": {
    intro:
      "Nageshwar Colony is a quieter residential pocket in central Patna, where we place helpers for daily cleaning and cooking, often serving households here alongside the neighbouring Kankarbagh and Rajendra Nagar areas.",
    nearby: ["Kankarbagh", "Hanuman Nagar", "Rajendra Nagar"],
  },
  "Raja Bazar": {
    intro:
      "Raja Bazar, near Patna Science College and Patna Junction, is a busy, centrally located locality with a steady need for part-time and daily domestic help among its resident families.",
    nearby: ["Fraser Road", "Shastrinagar", "Exhibition Road"],
  },
  "Saguna More": {
    intro:
      "Saguna More, on the western outskirts of Patna, has become one of the city's fastest-developing residential and commercial hubs. New housing societies here have driven strong demand for verified maids, cooks, and babysitters.",
    nearby: ["Danapur", "Gola Road", "Digha"],
  },
  "Patna City": {
    intro:
      "Patna City is the old, historic heart of the city along the Ganges, home to some of Patna's oldest residential lanes and markets. Households here often rely on long-standing local networks for domestic help, though formal verification is less common than the trust is.",
    nearby: ["Fraser Road", "Gulzarbagh", "Mahendru"],
  },
  "Gulzarbagh": {
    intro:
      "Gulzarbagh, near the river in old Patna, is a mixed residential and industrial locality with a long-settled population. Demand here leans toward part-time cooking and cleaning help for established family homes.",
    nearby: ["Patna City", "Mahendru", "Fraser Road"],
  },
  "Mahendru": {
    intro:
      "Mahendru is an old riverside locality in central Patna, known for its narrow lanes and long-time resident families. We place cooks and cleaning staff here for households looking for reliable, familiar help.",
    nearby: ["Patna City", "Gulzarbagh", "Kurji"],
  },
  "Machhua Toli": {
    intro:
      "Machhua Toli, in the heart of old Patna's market district, is a busy, closely packed residential-commercial pocket. Families here often need domestic help that can work flexibly around a busy street.",
    nearby: ["Nala Road", "Dak Bungalow Chowk", "Fraser Road"],
  },
  "Pirmuhani": {
    intro:
      "Pirmuhani, part of Patna's old wholesale market area, is home to families living above and around long-running businesses. Part-time cooking and cleaning are the most requested services.",
    nearby: ["Machhua Toli", "Nala Road", "Fraser Road"],
  },
  "Nala Road": {
    intro:
      "Nala Road, a historic commercial stretch in central Patna, has residential pockets tucked among its shops and offices. Households here typically look for flexible, part-time domestic help.",
    nearby: ["Machhua Toli", "Pirmuhani", "Fraser Road"],
  },
  "Dak Bungalow Chowk": {
    intro:
      "Dak Bungalow Chowk, one of central Patna's busiest commercial junctions, has residential buildings and offices side by side. Working households here often need help that fits around a demanding schedule.",
    nearby: ["Exhibition Road", "Fraser Road", "Khetan Market"],
  },
  "Khetan Market": {
    intro:
      "Khetan Market, a well-known central Patna commercial hub, has residences interspersed with shops and offices. Part-time cleaning and cooking are the most common domestic help requests here.",
    nearby: ["Dak Bungalow Chowk", "Exhibition Road", "Fraser Road"],
  },
  "Chajju Bagh": {
    intro:
      "Chajju Bagh, in the older commercial core of Patna, is home to families running businesses alongside long-settled residences. Domestic help here is typically hired through established local relationships.",
    nearby: ["Bohra Toli", "Dhanaut", "Fraser Road"],
  },
  "Bohra Toli": {
    intro:
      "Bohra Toli, in central Patna's historic trading district, has a mix of shopfronts and family homes. Households here look for cooks and cleaners who can work around business hours.",
    nearby: ["Chajju Bagh", "Dhanaut", "Fraser Road"],
  },
  "Dhanaut": {
    intro:
      "Dhanaut, an old market locality in central Patna, has residential lanes running alongside its commercial streets. Families here most often need part-time cooking and cleaning help.",
    nearby: ["Chajju Bagh", "Bohra Toli", "Lodipur"],
  },
  "Lodipur": {
    intro:
      "Lodipur, near Patna's historic Fraser Road area, is a long-settled residential-commercial pocket. Domestic help here tends to be hired through familiar, local networks.",
    nearby: ["Khajanchi Road", "Fraser Road", "Dhanaut"],
  },
  "Khajanchi Road": {
    intro:
      "Khajanchi Road, close to Fraser Road in central Patna, has a mix of residences and small businesses. Families here typically need flexible, part-time domestic help.",
    nearby: ["Lodipur", "Fraser Road", "Exhibition Road"],
  },
  "Bakerganj": {
    intro:
      "Bakerganj, one of Patna's older commercial neighbourhoods, has residential lanes woven through its markets. Households here commonly hire part-time cooks and cleaners.",
    nearby: ["Dhanaut", "Machhua Toli", "Fraser Road"],
  },
  "Lohanipur": {
    intro:
      "Lohanipur, near Kadamkuan in central Patna, is a settled residential locality with a mix of older and newer housing. Full-time cooking and cleaning help are commonly requested here.",
    nearby: ["Kadamkuan", "Fraser Road", "Kumhrar"],
  },
  "Kumhrar": {
    intro:
      "Kumhrar, known for its historical significance, is a quieter residential locality in central Patna. Families here look for dependable part-time or full-time domestic help.",
    nearby: ["Kankarbagh", "Lohanipur", "Kadamkuan"],
  },
  "Gandhi Maidan": {
    intro:
      "Gandhi Maidan, the central gathering ground of Patna, is surrounded by a mix of commercial buildings and residences. Households nearby often need domestic help that can work flexibly around a busy, central location.",
    nearby: ["Exhibition Road", "Fraser Road", "Raja Bazar"],
  },
  "Khagaul": {
    intro:
      "Khagaul, a railway town on Patna's western edge near Danapur, has a steady residential population with its own demand for domestic help. Families here often look for full-time cooks and cleaners.",
    nearby: ["Danapur", "Saguna More", "Gola Road"],
  },
  "Sipara": {
    intro:
      "Sipara, on the western outskirts of Patna near Danapur, is a developing residential pocket. Households here commonly request part-time and daily cleaning help.",
    nearby: ["Danapur", "Golambar", "Gola Road"],
  },
  "Phulwari Sharif": {
    intro:
      "Phulwari Sharif, on Patna's southwestern edge, is a growing residential area with its own local market. Families here typically look for part-time cooking and cleaning help.",
    nearby: ["Danapur", "Khagaul", "Saguna More"],
  },
  "Bihta": {
    intro:
      "Bihta, further out on Patna's western edge, is a developing area with a growing residential population. Demand here is mostly for part-time or daily domestic help as new households settle in.",
    nearby: ["Danapur", "Khagaul", "Gola Road"],
  },
  "Golambar": {
    intro:
      "Golambar, a key junction on the way to Danapur, has residential pockets around its busy roads. Families here often need help that fits around a commuter-heavy area.",
    nearby: ["Danapur", "Sipara", "Saguna More"],
  },
  "Kurji": {
    intro:
      "Kurji, along the Ganges in west Patna near Digha, is a settled riverside locality. Households here commonly hire part-time or full-time cooks and cleaners.",
    nearby: ["Digha", "Danapur", "Saguna More"],
  },
  "Rajbansi Nagar": {
    intro:
      "Rajbansi Nagar, close to Bailey Road, is a settled residential locality with a mix of independent houses and flats. Full-time cooking and elder care are commonly requested here.",
    nearby: ["Bailey Road (Nehru Path)", "Kidwaipuri", "Sri Krishna Puri (SK Puri)"],
  },
  "Jagdeo Path": {
    intro:
      "Jagdeo Path, off Bailey Road, is a well-established residential stretch. Families here typically look for full-time or live-in domestic help.",
    nearby: ["Bailey Road (Nehru Path)", "Rajbansi Nagar", "Kidwaipuri"],
  },
  "Sanjay Gandhi Nagar": {
    intro:
      "Sanjay Gandhi Nagar, near Bailey Road, is a quieter residential pocket. Households here commonly hire part-time cooks and cleaners.",
    nearby: ["Bailey Road (Nehru Path)", "Jagdeo Path", "Kidwaipuri"],
  },
  "Gardanibagh": {
    intro:
      "Gardanibagh, near Bailey Road, has a mix of government housing and private residences. Elder care and full-time cooking are commonly requested here, similar to nearby Kidwaipuri.",
    nearby: ["Kidwaipuri", "Bailey Road (Nehru Path)", "Keshri Nagar"],
  },
  "Buddha Colony": {
    intro:
      "Buddha Colony, close to Bailey Road and Patliputra Colony, is a settled residential locality. Families here typically look for full-time cooking and cleaning help.",
    nearby: ["Bailey Road (Nehru Path)", "Patliputra Colony", "Boring Road"],
  },
  "Keshri Nagar": {
    intro:
      "Keshri Nagar, near Gardanibagh and Bailey Road, is a residential pocket with steady demand for part-time and full-time domestic help.",
    nearby: ["Gardanibagh", "Bailey Road (Nehru Path)", "Kidwaipuri"],
  },
  "Chitragupta Nagar": {
    intro:
      "Chitragupta Nagar, close to Kankarbagh, is a settled residential locality. Households here commonly hire full-time cooks and cleaners, much like the wider Kankarbagh area.",
    nearby: ["Kankarbagh", "Hanuman Nagar", "Rajendra Nagar"],
  },
  "Jalalpur": {
    intro:
      "Jalalpur, near Kankarbagh, is a residential pocket with steady demand for part-time and daily domestic help.",
    nearby: ["Kankarbagh", "Chitkohra", "Rajendra Nagar"],
  },
  "Chitkohra": {
    intro:
      "Chitkohra, close to Kankarbagh and Yarpur, is a developing residential area. Families here typically look for daily or part-time cleaning and cooking help.",
    nearby: ["Kankarbagh", "Yarpur", "Jalalpur"],
  },
  "Yarpur": {
    intro:
      "Yarpur, near Chitkohra in south Patna, is a residential locality with a mix of older and newer housing. Domestic help demand here mirrors the wider Kankarbagh-Rajendra Nagar corridor.",
    nearby: ["Chitkohra", "Kankarbagh", "Rajendra Nagar"],
  },
  "Patrakar Nagar": {
    intro:
      "Patrakar Nagar, close to Kankarbagh, is a settled residential colony. Families here commonly hire live-in help for elder care and full-time cooking.",
    nearby: ["Kankarbagh", "Hanuman Nagar", "Nageshwar Colony"],
  },
  "Ramkrishna Nagar": {
    intro:
      "Ramkrishna Nagar, near Kankarbagh, is a residential locality with steady demand for part-time and full-time domestic help.",
    nearby: ["Kankarbagh", "Hanuman Nagar", "Rajendra Nagar"],
  },
  "Haroon Nagar": {
    intro:
      "Haroon Nagar, close to Rajendra Nagar and Kankarbagh, is a settled residential pocket. Households here typically request part-time cooking and childcare help.",
    nearby: ["Rajendra Nagar", "Kankarbagh", "Nageshwar Colony"],
  },
  "Jakkanpur": {
    intro:
      "Jakkanpur, near Kankarbagh, is a residential locality where daily and part-time cooking help are commonly requested.",
    nearby: ["Kankarbagh", "Nageshwar Colony", "Hanuman Nagar"],
  },
  "Mahesh Nagar": {
    intro:
      "Mahesh Nagar, close to Rajendra Nagar, is a settled residential area. Families here commonly hire full-time cooks and elder-care helpers.",
    nearby: ["Rajendra Nagar", "Kadamkuan", "Kankarbagh"],
  },
  "Munna Chowk": {
    intro:
      "Munna Chowk, near Kankarbagh, is a busy residential-commercial junction. Households nearby typically request daily cooking and cleaning help.",
    nearby: ["Kankarbagh", "Shastrinagar", "Hanuman Nagar"],
  },
  "Khajpura": {
    intro:
      "Khajpura, close to Kankarbagh and Rajendra Nagar, is a settled residential locality with steady demand for full-time domestic help.",
    nearby: ["Kankarbagh", "Rajendra Nagar", "Hanuman Nagar"],
  },
  "Rukanpura": {
    intro:
      "Rukanpura, near Rajendra Nagar and Anisabad, is a developing residential pocket. Families here commonly look for part-time or daily cooking and cleaning help.",
    nearby: ["Rajendra Nagar", "Anisabad", "Kadamkuan"],
  },
  "Mithapur": {
    intro:
      "Mithapur, close to Anisabad, is a settled residential locality. Households here typically request live-in help for cooking and elder care.",
    nearby: ["Anisabad", "Rajendra Nagar", "Kadamkuan"],
  },
  "Lohia Nagar": {
    intro:
      "Lohia Nagar, near Kankarbagh and Rajendra Nagar, is a residential pocket with steady demand for part-time and daily domestic help.",
    nearby: ["Kankarbagh", "Rajendra Nagar", "Nageshwar Colony"],
  },
  "Anisabad": {
    intro:
      "Anisabad, near the Patna High Court, is a well-established residential locality. Households here typically hire full-time cooks and cleaning help.",
    nearby: ["Rajendra Nagar", "Kadamkuan", "Rukanpura"],
  },
  "Rajapur Main": {
    intro:
      "Rajapur Main, in south Patna near Anisabad, is a settled residential pocket. Families here commonly request part-time cooking and cleaning help.",
    nearby: ["Anisabad", "Rupaspur", "Rajendra Nagar"],
  },
  "Rupaspur": {
    intro:
      "Rupaspur, close to Rajapur and Anisabad, is a developing residential area. Households here typically look for daily or part-time cleaning help.",
    nearby: ["Rajapur Main", "RPS More", "Anisabad"],
  },
  "RPS More": {
    intro:
      "RPS More, along the Ring Road near Rupaspur, is a growing residential junction. Families here commonly hire part-time cooks and cleaners as new housing fills in.",
    nearby: ["Rupaspur", "Rajapur Main", "Anisabad"],
  },
  "Police Colony": {
    intro:
      "Police Colony, in south Patna, is a settled residential area housing many service families. Full-time cooking and elder care are commonly requested here.",
    nearby: ["Anisabad", "Rajendra Nagar", "Kadamkuan"],
  },
  "Anandpuri": {
    intro:
      "Anandpuri, in south Patna, is a quieter residential locality. Households here typically hire part-time or daily domestic help.",
    nearby: ["Anisabad", "Rajendra Nagar", "Kadamkuan"],
  },
  "Beur": {
    intro:
      "Beur, on Patna's southern edge, is a developing residential area. Families here commonly look for part-time cooking and cleaning help as the locality grows.",
    nearby: ["Anisabad", "Rajapur Main", "Rupaspur"],
  },
  "Ram Nagari": {
    intro:
      "Ram Nagari, near Ashiana Nagar and Digha, is a settled residential pocket. Households here typically request daily or part-time cleaning help.",
    nearby: ["Ashiana Nagar", "Digha", "Rajendra Nagar"],
  },
  "Ashiana Road": {
    intro:
      "Ashiana Road, connecting Boring Road to Ashiana Nagar, is a busy residential stretch. Families here commonly hire full-time cooks and cleaners, similar to the wider Boring Road-Ashiana corridor.",
    nearby: ["Boring Road", "Ashiana Nagar", "Patliputra Colony"],
  },
};

export const COVERED_LOCALITIES = Object.keys(LOCALITY_CONTENT);
