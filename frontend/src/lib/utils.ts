import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const examplePrompts = [
  {
    name: "Article Summarization",
    prompt: `summarize this:
Boston Consulting Group, Inc. (BCG) is an American global management consulting firm founded in 1963 and headquartered in Boston, Massachusetts.[3] It is one of the Big Three (or MBB, the world's three largest management consulting firms by revenue) along with McKinsey & Company and Bain & Company. Since 2021, BCG has been led by the German executive Christoph Schweizer.[4][5][6]

History
The firm was founded in 1963 as part of The Boston Safe Deposit and Trust Company. Bruce Henderson had been recruited from Arthur D. Little to establish the consulting arm operating as a subsidiary under the name Management and Consulting Division of the Boston Safe Deposit and Trust Company. Initially the division only advised clients of the bank, with billings for the first month at just US$500. Henderson hired his second consultant, Arthur P. Contas, in December 1963.[7] In 1966, BCG opened its second office in Tokyo, Japan.[8]

In 1967, Henderson met Bill Bain and offered him a role at the firm. Bain agreed and joined in 1967 at a starting salary of $17,000 per year.[9][10][11] In the early 1970s, Bain was considered internally to be Henderson's eventual successor. However, in 1973 Bain resigned from BCG to start his own strategy consulting firm, Bain & Company, hiring away six of BCG's employees.[9][10]

In 1974, Henderson arranged an employee stock ownership plan so that the employees could make the company independent from The Boston Safe Deposit and Trust Company. The buyout of all shares was completed in 1979.[12]

In the 1980s, BCG introduced the concept of time-based competition that reconsidered the role of time management in providing market advantages. The concept was the subject of an essay in the Harvard Business Review.[13]

In May 2021, the firm elected Christoph Schweizer as CEO, replacing Rich Lesser who would step down and serve as the firm's Global Chair. [14]

In 2022, Boston Consulting Group released its 2022 Annual Sustainability Report highlighting numerous initiatives focused on societal and planetary impact. Since 2015, the progress in numbers is 30% less greenhouse gas emissions, 20% less water usage, 15% less waste generation, and 10% less energy consumption. [15]

Recruiting
BCG typically hires for an associate or a consultant position, recruiting from top undergraduate colleges, advanced degree programs and business schools.[16]

BCG growth-share matrix
Main article: Growth–share matrix

The BCG growth-share matrix
In the 1970s, BCG created and popularized the growth–share matrix, a chart to help large corporations decide how to allocate cash among their business units. The corporation would categorize its business units as Stars, Cash Cows, Question Marks, or Dogs, and then allocate cash accordingly, moving money from Cash Cows toward Stars and Question Marks, which have higher market growth rates and hence greater upside potential.[17]

BCG extended business units
BCG X
In December 2022, BCG consolidated many of its alternative business units under a single entity, branded as BCG X.[18] This included several business units focused on providing digital and technology-related consulting services for clients:

BCG Gamma specializes in data science projects, including advanced analytics, machine learning and AI, alongside BCG's traditional consulting services.[19]
BCG Digital Ventures partners with companies to invent, launch, and scale new products and services.[20] Ware2Go (a logistics platform developed with United Parcel Service), Tracr (a blockchain-based supply chain tracker developed with De Beers) and OpenSC (a supply chain tracker developed with the World Wide Fund for Nature) are projects backed by BCGDV.[21][22][23][24]
BCG Platinion specializes in technology and digital transformation consulting services.[25]
BCG Brighthouse
BCG Brighthouse is a consultancy focused on business purpose consulting.[26]

BCG Henderson Institute
The Henderson Institute is Boston Consulting Group's think tank named after Bruce Henderson, the founder of BCG. The institute's primary focus is on conducting research into strategic and managerial issues that impact businesses and the global economy.[27]

Centre for Public Impact
The Centre for Public Impact is a not-for-profit organization within BCG that is focused on improving the impact and effectiveness of government and public sector organizations. This group works with governments, nonprofit organizations, and other public sector entities to help them achieve their goals and deliver better outcomes for citizens.[28]

Controversy
Angola
An article published by The New York Times on January 19, 2020, identified the Boston Consulting Group as having worked with Isabel dos Santos, who exploited Angola's natural resources while the country suffers from poverty, illiteracy, and infant mortality.[29] According to the article, BCG was contracted by the Angolan state-owned petroleum company Sonangol, as well as the jewelry company De Grisogono, owned by her husband through shell companies in Luxembourg, Malta and the Netherlands; the firm was reportedly paid through offshore companies in tax havens such as Malta.[29]

Saudi Arabia
The New York Times also reported that Boston Consulting Group is one of the consulting firms, along with McKinsey and Booz Allen, helping Crown Prince Mohammed bin Salman consolidate power in Saudi Arabia.[30] While a BCG spokesperson said the firm turns down projects involving military and intelligence strategy, BCG is involved in designing the economic blueprint for the country, a plan called Vision 2030.[30]

In June 2021, BCG was hired to examine the feasibility for the country to host the 2030 FIFA World Cup. The bid was assessed to be a great deal, as FIFA's policy of continental rotation blocked all the Asian Football Confederation (AFC) nations from hosting the World Cup until 2034, after Qatar was set to become the first Middle Eastern nation to host the tournament in 2022.[31]

In 2024, BCG consulting heads were summoned to appear before congress to disclose financial details between them and Saudi Arabia and warned staff that they could face jail time if they reveal information.[32]

Sweden
Boston Consulting Group has received criticism for its involvement in the construction of the New Karolinska Solna University Hospital after an investigation by Dagens Nyheter. Specifically, the potential conflict of interest where a former BCG employee and then hospital executive approved numerous expenses without proper receipts and the high cost paid for external consultants including BCG.[33] In the investigative journalism book Konsulterna - Kampen om Karolinska (roughly The Consultants - The Struggle for the Karolinska University Hospital), the authors and Dagens Nyheter journalists Anna Gustavsson and Lisa Röstlund argue that the value-based health care model as recommended by BCG had not been properly investigated and have resulted in an exponential growth in administration and lack of responsibility for patients.[34]

United States
In 2022, BCG filed a lawsuit against GameStop as the latter allegedly denied payment of fee worth $30 million for a project. GameStop argued that it saw it is in the best interest of its stakeholders to deny payment as BCG brought little improvement to the EBITDA of the company, which the consultancy allegedly promised to improve. BCG counter argued that the company has delivered more than it promised in statement of proposal and that the quoted variable fee was based on the projected, not realized, improvement in EBITDA, as per the contract. [35] On July 30, 2024 the suit was concluded in a joint dismissal. [36]
    `,
  },
  {
    name: "Email Chain Summarization",
    prompt: `summarise this email chain for me:
    **Subject:** Country-Specific Mappings for Google Shopping
---
**John Lee** <john.lee@codedynamics.com>
**Mon, Sept 23, 22:18**
To: **Jake Harris** <jake.harris@bordtech.com>, **Mike Daniels** <mike.daniels@bordtech.com>, **me**
Hi Mike, hi Jake,
Thank you for your honest feedback.
I completely understand your frustration, and I must say that I am equally disappointed that the results did not meet your expectations. In our company's history, this is the first time a project has gone in this direction.
The initial evaluation of Price API with SP Lab looked very promising, so we were confident it would be equally successful for you. It’s even more frustrating that this expectation wasn’t fulfilled. We will discontinue our collaboration with Price API immediately on this project.
We place great value on your satisfaction and want to offer you additional benefits. After careful consideration, we believe the best way to support you is by assisting with the further introduction of AI.
Following discussions with Oliver, we have two options to propose:
1. A refund of the remaining balance of $1,200.
2. Ten hours of free AI consulting (valued at $1,800), which can also be conducted on-site if you prefer.
Let’s discuss this calmly after tomorrow’s AI workshop.
Best regards,
**John**
---
**John Lee**
Co-Founder | Head of People & Culture
CodeDynamics LLC
123 Main Street
San Mateo, CA 94401
+1 (415) 555-0135
john.lee@codedynamics.com
[www.codedynamics.com](http://www.codedynamics.com)
---
**Jake Harris** <jake.harris@bordtech.com>
**Mon, Sept 23, 11:50**
To: **John Lee** <john.lee@codedynamics.com>
Cc: **Mike Daniels** <mike.daniels@bordtech.com>
Hi John,
Thanks for the response.
We’ve invested a lot of time and money, always holding onto the hope that the error was on our end. Now that all products are listed in the free entries and there’s still no valid data from Price API, I have to end the project here. The disappointing results don’t even remotely match the expectations set at the beginning, making this project a total miss.
I know you’re as frustrated with the data quality as we are, and I feel that the responsibility for this lies with Robert and the Price API service.
If you have any other suggestions on how to get reliable pricing data, maybe we can find a way to collaborate again in the future.
Best regards,
Jake
---
**John Lee** <john.lee@codedynamics.com>
**Mon, Sept 23, 11:18**
To: **Jake Harris** <jake.harris@bordtech.com>
Cc: **Mike Daniels** <mike.daniels@bordtech.com>
Hi Jake,
Apologies for the late response – I was fully booked on Thursday and Friday.
On Wednesday, we conducted the scrape for AeroGear. The results were, unfortunately, underwhelming, and I’ve attached them for you.
The most relevant findings are here:
The coverage has slightly improved, but still, only around 23% of the products were found. There was an average of 1.3 offers per product (out of 1,245 offers for 986 found products), including your entries.
A quick manual search showed that many available Google Shopping offers were missed by Price API.
I’m now fully in favor of ending our work with Price API. It’s frustrating that it’s been so ineffective.
We are exploring alternative solutions and will keep you updated.
Best,
John
---
**Jake Harris** <jake.harris@bordtech.com>
**Wed, Sept 18, 16:13**
To: **John Lee** <john.lee@codedynamics.com>
Hey John,
The data in the feed and export for this mapping are solely for AeroGear.
Go ahead with the scrape for AeroGear so we can assess the coverage and quality.
Best regards,
Jake
---
**Mike Daniels** <mike.daniels@bordtech.com>
**Tue, Sept 24, 09:30**
To: **John Lee** <john.lee@codedynamics.com>, **Jake Harris** <jake.harris@bordtech.com>, **me**
Hello everyone,
I have a third proposal! :-)
We absolutely need a price monitoring tool – there’s no way around it for us at B&T.
I suggest we take another look at other "Pricing Optimization Software" options, like those on [Capterra](https://www.capterra.com/pricing-optimization-software/?features=ae17b9c0-e5fd-480d-a161-0d363297e5f1).
What we definitely want, and you’ve already achieved, is output in a table format by country and category. So let’s not throw in the towel too quickly. PriceWatcher, our previous provider, offers an API that could help pull data in table form.
Best,
**Mike Daniels**
Head of E-Commerce
    `,
  },
  {
    name: "Chatbot with History",
    prompt: `System: You are a helpful assistant. Help the user with their questions.
User: What is the weather in Tokyo?
Assistant: The weather in Tokyo is currently sunny with a temperature of 22°C.
User: I am travelling to Tokyo next week, what should I pack?
Assistant: You should pack a light jacket and comfortable shoes. You should prepare for rain as it is common in Tokyo.
User: What are the best places to visit in Tokyo? I am travelling with my family.
Assistant: You should visit the Tokyo Tower and the Senso-ji Temple they are both very popular with families.
User: How much time should I allow for my trip and the locations you recommended?
    `,
  },
  {
    name: "Code Review",
    prompt: `I have written a function in Python that calculates the factorial of a given number using recursion. However, I am concerned about the efficiency and potential issues when handling large numbers. Could you review my code, point out any inefficiencies or improvements I could make, and suggest alternatives if necessary? Additionally, please check for any best practices or coding standards that I might have overlooked. Here is the code:
    def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n - 1)
    Specifically, I’m interested in understanding:

	•	If recursion is the best approach for this problem, and if not, what would be a better alternative.
	•	Whether there are any edge cases my code might fail to handle.
	•	Any improvements I could make to enhance readability or performance.”
    `,
  },
  {
    name: "Code Generation",
    prompt: `I’m working on a web application using React and TypeScript. I need to create a reusable component for a dropdown menu that supports dynamic options and includes basic accessibility features (like keyboard navigation and ARIA roles). The component should accept an array of options as props and render them in a dropdown format. It should also allow users to select an option using both mouse clicks and keyboard arrows.

Could you generate the code for this dropdown component? Make sure the code follows TypeScript best practices and includes comments explaining the important parts. Additionally, if possible, provide a small CSS snippet for styling the dropdown, ensuring that it is both visually appealing and responsive.
    `,
  },
  {
    name: "Translation",
    prompt: `I have an English paragraph that needs to be translated into French for an official document. The translation should maintain a formal tone and be as accurate as possible, retaining the original meaning while adapting to cultural and linguistic nuances. Here’s the paragraph:

‘Our company is committed to delivering high-quality products that meet international standards. We continuously strive to innovate and improve our processes to better serve our clients and maintain our position as a leader in the industry. Transparency, sustainability, and excellence are the core values that guide our operations.’

Please provide the French translation, and also highlight any cultural considerations or adjustments made during the translation process.
    `,
  },
  {
    name: "Question Answering",
    prompt: `I’m researching the impact of climate change on polar bear populations, and I have some specific questions. Could you help answer them based on the latest scientific studies and data? Here are the questions:

	1.	How has the shrinking of sea ice affected the hunting patterns and habitat of polar bears?
	2.	What are the main threats to polar bear survival apart from habitat loss, and how are conservation efforts addressing these challenges?
	3.	Are there any recent findings on polar bear adaptation to changing conditions, such as shifts in diet or behavior?

Please provide detailed answers, referencing any relevant studies or data sources. I am particularly interested in information from the past five years, focusing on the Arctic region.
    `,
  },
];
