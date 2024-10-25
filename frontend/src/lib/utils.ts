import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const examplePrompts = [
  {
    name: "BCG Wikipedia Summarization",
    prompt: `
summarize this:
Boston Consulting Group, Inc. (BCG) is an American global management consulting firm founded in 1963 and headquartered in Boston, Massachusetts.[3] It is one of the "Big Three" (or MBB, the world's three largest management consulting firms by revenue) along with McKinsey & Company and Bain & Company. Since 2021, BCG has been led by the German executive Christoph Schweizer.[4][5][6]

History
The firm was founded in 1963 as part of The Boston Safe Deposit and Trust Company. Bruce Henderson had been recruited from Arthur D. Little to establish the consulting arm operating as a subsidiary under the name Management and Consulting Division of the Boston Safe Deposit and Trust Company. Initially the division only advised clients of the bank, with billings for the first month at just US$500. Henderson hired his second consultant, Arthur P. Contas, in December 1963.[7] In 1966, BCG opened its second office in Tokyo, Japan.[8]

In 1967, Henderson met Bill Bain and offered him a role at the firm. Bain agreed and joined in 1967 at a starting salary of $17,000 per year.[9][10][11] In the early 1970s, Bain was considered internally to be Henderson's eventual successor. However, in 1973 Bain resigned from BCG to start his own strategy consulting firm, Bain & Company, hiring away six of BCG's employees.[9][10]

In 1974, Henderson arranged an employee stock ownership plan so that the employees could make the company independent from The Boston Safe Deposit and Trust Company. The buyout of all shares was completed in 1979.[12]

In the 1980s, BCG introduced the concept of time-based competition that reconsidered the role of time management in providing market advantages. The concept was the subject of an essay in the Harvard Business Review.[13]

In May 2021, the firm elected Christoph Schweizer as CEO, replacing Rich Lesser who would step down and serve as the firm's Global Chair. [14]

In 2022, Boston Consulting Group released its "2022 Annual Sustainability Report" highlighting numerous initiatives focused on societal and planetary impact. Since 2015, the progress in numbers is 30% less greenhouse gas emissions, 20% less water usage, 15% less waste generation, and 10% less energy consumption. [15]

Recruiting
BCG typically hires for an associate or a consultant position, recruiting from top undergraduate colleges, advanced degree programs and business schools.[16]

BCG growth-share matrix
Main article: Growth–share matrix

The BCG growth-share matrix
In the 1970s, BCG created and popularized the "growth–share matrix," a chart to help large corporations decide how to allocate cash among their business units. The corporation would categorize its business units as "Stars," "Cash Cows," "Question Marks," or "Dogs," and then allocate cash accordingly, moving money from "Cash Cows" toward "Stars" and "Question Marks," which have higher market growth rates and hence greater upside potential.[17]

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
In 2022, BCG filed a lawsuit against GameStop as the latter allegedly denied payment of fee worth $30 million for a project. GameStop argued that it saw it is in the best interest of its stakeholders to deny payment as BCG brought little improvement to the EBITDA of the company, which the consultancy allegedly promised to improve. BCG counter argued that the company has delivered more than it promised in statement of proposal and that the quoted variable fee was based on the "projected," not realized, improvement in EBITDA, as per the contract. [35] On July 30, 2024 the suit was concluded in a joint dismissal. [36]
    `,
  },
  {
    name: "RAG Use Case",
    prompt: `
You are an assistant for question-answering tasks. Use the following pieces of retrieved context to answer the question. If you don’t know the answer, just say that you don’t know. Use three sentences maximum and keep the answer concise.
Question: How old is the Boston Consulting Group?
Context: <context>
- The Boston Consulting Group was founded in 1963.
- The Boston Consulting Group is a US-American consulting firm.
- The Boston Consulting Group has more than 100 offices in over 50 countries.
- The Boston Consulting Group is a strategy consulting firm.
- The Boston Consulting Group has more than 100 offices in over 50 countries.
- The Boston Consulting Group is a full-service consulting firm.
- The Boston Consulting Group is a private company.
</context>
Answer:
    `,
  },
  {
    name: "Chatbot Use Case",
    prompt: `
System: You are a helpful assistant. Help the user with their questions.
User: What is the weather in Tokyo?
Assistant: The weather in Tokyo is currently sunny with a temperature of 22°C.
User: What is the weather in Tokyo?
Assistant: The weather in Tokyo is currently sunny with a temperature of 22°C.
User: What is the weather in Tokyo?
Assistant: The weather in Tokyo is currently sunny with a temperature of 22°C.
User: What is the weather in Tokyo?
    `,
  },
];
