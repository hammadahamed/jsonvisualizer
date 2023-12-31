// export const JSON_original = `[
//     "hello 1",
//     "hello 2",
//     ["hello 3", "helo 4"],
//     {
//         "company": "Amazon.com",
//         "description": "Amazon.com, Inc. is an online retailer in North America and internationally. The company serves consumers through its retail Web sites and focuses on selection, price, and convenience. It also offers programs that enable sellers to sell their products on its Web sites, and their own branded Web sites. In addition, the company serves developer customers through Amazon Web Services, which provides access to technology infrastructure that developers can use to enable virtually various type of business. Further, it manufactures and sells the Kindle e-reader. Founded in 1994 and headquartered in Seattle, Washington.",
//         "initial_price": 89.38,
//         "price_2002": 17.01,
//         "price_2007": 93.43,
//         "symbol": "AMZN"
//     },
//     {
//         "company": "Disney",
//         "description": "The Walt Disney Company, founded in 1923, is a worldwide entertainment company, with movies, cable networks, radio networks, movie production, musical recordings and live stage plays. Disney also operates Walt Disney World in Florida and Disneyland in California, Disney Cruise Line, and international Disney resorts. Disney owns countless licenses and literary properties and publishes books and magazines.",
//         "initial_price": 40.68,
//         "price_2002": 15.24,
//         "price_2007": 35.47,
//         "symbol": "DIS"
//     },
//     {
//         "company": "Hewlett Packard",
//         "description": "Hewlett-Packard designs and sells products, technologies, software and IT services to consumers, businesses, government and education sectors worldwide. HP offers storage and server products, PCs, calculators, printers, scanners, network infrastructure products, video products (under the Halo brand), and Palm smartphones. HP was founded in 1939 and is headquartered in Palo Alto, California.",
//         "initial_price": 66.28,
//         "price_2002": 12.03,
//         "price_2007": 50.9,
//         "symbol": "HPQ"
//     },
//     {
//         "company": "IBM",
//         "description": "IBM is an international IT company. IBM offers infrastructure and technology services, software for business integration and information management, data warehousing, identity management software, data security, Lotus software for collaboration, messaging and social networking, business intelligence software, servers, and storage systems. IBM was founded in 1910 and is based in Armonk, New York.",
//         "price_2007": 116.3,
//         "symbol": "IBM"
//     },
// ]
// `;

export const JSON_original = `{
    "heroes": [
      {
        "name": "Iron Man",
        "superpowers": [
          {
            "power": "Superhuman strength",
            "level": "Mk XLVII"
          },
          {
            "power": "Flight",
            "level": "Mk XLVII"
          },
          {
            "power": "Energy Projection",
            "level": "Mk XLVII"
          }
        ],
        "special_attacks": [
          {
            "attack_name": "Repulsor Blast",
            "damage": "High",
            "cooldown": "30 seconds"
          },
          {
            "attack_name": "Unibeam",
            "damage": "Extreme",
            "cooldown": "2 minutes"
          }
        ],
        "family_members": ["Pepper Potts (Partner)", "Morgan Stark (Daughter)"]
      },
      {
        "name": "Spider-Man",
        "superpowers": [
          {
            "power": "Wall-Crawling",
            "level": "Enhanced"
          },
          {
            "power": "Superhuman Agility",
            "level": "Enhanced"
          },
          {
            "power": "Spider-Sense",
            "level": "Enhanced"
          }
        ],
        "special_attacks": [
          {
            "attack_name": "Web Strike",
            "damage": "Moderate",
            "cooldown": "15 seconds"
          },
          {
            "attack_name": "Web Swing",
            "damage": "Low",
            "cooldown": "10 seconds"
          }
        ],
        "family_members": ["Aunt May (Aunt)", "Uncle Ben (Uncle)"]
      }
    ]
  }
`;

export const JSON_modified = `{
    "heroes": [
      {
        "name": "Iron Man",
        "superpowers": [
          {
            "power": "Superhuman strength",
            "level": "Mk XLVII"
          },
          {
            "power": "Flight",
            "level": "Mk XLVII"
          },
          {
            "power": "Energy Projection",
            "level": "Mk XLVII"
          }
        ],
        "special_attacks": [
          {
            "attack_name": "Repulsor Blast",
            "damage": "High",
            "cooldown": "30 seconds"
          },
          {
            "attack_name": "Unibeam",
            "damage": "Extreme",
            "cooldown": "2 minutes"
          }
        ]
      },
      {
        "name": "Spider-Man",
        "superpowers": [
          {
            "power": "Wall-Crawling",
            "level": "Enhanced"
          },
          {
            "power": "Superhuman Agility",
            "level": "Enhanced"
          },
        ],
        "special_attacks": [
          {
            "attack_name": "Web Strike",
            "damage": "Moderate",
            "cooldown": "15 seconds"
          },
          {
            "attack_name": "Web Swing",
            "damage": "Low",
            "cooldown": "10 seconds"
          }
        ],
        "family_members": ["Aunt May (Aunt)", "Uncle Ben (Uncle)"]
      }
    ]
  }
`;
