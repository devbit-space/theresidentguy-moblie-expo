import InterviewCopilot from "../interview-copilot"

const testimonials = [
    {
        "tag": "Management Consulting",
        "quote": "The AI Interview Copilot gave me the confidence I needed to tackle tough questions, and it helped me land a dream job in consulting.",
        "person": "Aisha Patel",
        "role": "Consulting at Deloitte",
        "companyLogo": "https://d12araoe7z5xxk.cloudfront.net/landing-page/images/questionBank/company1.png",
        "tagColor": "#FFB6C1"
    },
    {
        "tag": "Technology",
        "quote": "Being able to prepare for interviews with real-time AI feedback was a game changer and made me feel confident for my interview.",
        "person": "Liam O'Connor",
        "role": "Product at Apple",
        "companyLogo": "https://d12araoe7z5xxk.cloudfront.net/landing-page/images/questionBank/company2.png",
        "tagColor": "#ADD8E6"
    },
    {
        "tag": "Software",
        "quote": "Theresidentguy gave me the edge I needed to break into product management. The AI Interview Copilot was super helpful.",
        "person": "Michael Johnson",
        "role": "Product Manager at Salesforce",
        "companyLogo": "https://d12araoe7z5xxk.cloudfront.net/landing-page/images/questionBank/company3.png",
        "tagColor": "#90EE90"
    },
    {
        "tag": "Investment Banking",
        "quote": "The AI Interview Copilot gave me the prep and confidence to navigate challenging interview questions, leading to my role in finance.",
        "person": "Ananya Sharma",
        "role": "Investment Banking at Goldman Sachs",
        "companyLogo": "https://d12araoe7z5xxk.cloudfront.net/landing-page/images/questionBank/company4.png",
        "tagColor": "#FFD700"
    },
    {
        "tag": "IT",
        "quote": "Thanks to the AI Interview Copilot real-time feedback, I felt fully prepared and landed a role in software development.",
        "person": "Priya Singh",
        "role": "Software Developer at SAP",
        "companyLogo": "https://d12araoe7z5xxk.cloudfront.net/landing-page/images/questionBank/company5.png",
        "tagColor": "#FFA07A"
    },
    {
        "tag": "Entertainment",
        "quote": "Real-time AI guidance during my interview prep helped me secure a position in marketing in a highly competitive environment.",
        "person": "Sofia Rossi",
        "role": "Marketing at Netflix",
        "companyLogo": "https://d12araoe7z5xxk.cloudfront.net/landing-page/images/questionBank/company6.png",
        "tagColor": "#9370DB"
    },
    {
        "tag": "Legal Services",
        "quote": "The personalized AI Interview Copilot helped me stand out and secure a job in the legal industry.",
        "person": "Mona Khan",
        "role": "Legal at Baker McKenzie",
        "companyLogo": "https://d12araoe7z5xxk.cloudfront.net/landing-page/images/questionBank/company7.png",
        "tagColor": "#FF6347"
    },
    {
        "tag": "IT",
        "quote": "Using Theresidentguy, I felt much more confident in my interview approach, which led to my offer in project management.",
        "person": "James Matthews",
        "role": "Project Manager at IBM",
        "companyLogo": "https://d12araoe7z5xxk.cloudfront.net/landing-page/images/questionBank/company8.png",
        "tagColor": "#FFA07A"
    },
    {
        "tag": "Consulting",
        "quote": "The AI Interview Copilot session was incredibly helpful in preparing me for tough behavioral questions in the consulting industry.",
        "person": "Ravi Gupta",
        "role": "Consulting Professional at Accenture",
        "companyLogo": "https://d12araoe7z5xxk.cloudfront.net/landing-page/images/questionBank/company9.png",
        "tagColor": "#4682B4"
    },
    {
        "tag": "Healthcare",
        "quote": "Theresidentguy's structured approach to interview prep helped me feel more prepared and get the job I've always wanted in healthcare.",
        "person": "Rajiv Kumar",
        "role": "Healthcare Professional at Tata 1mg",
        "companyLogo": "https://d12araoe7z5xxk.cloudfront.net/landing-page/images/questionBank/company10.png",
        "tagColor": "#6A5ACD"
    },
    {
        "tag": "Food Delivery Services",
        "quote": "Theresidentguy helped me practice for interviews with confidence, which led to me getting an offer in sales.",
        "person": "Maya Patel",
        "role": "Sales Professional at Swiggy",
        "companyLogo": "https://d12araoe7z5xxk.cloudfront.net/landing-page/images/questionBank/company11.png",
        "tagColor": "#20B2AA"
    },
    {
        "tag": "Digital Marketing",
        "quote": "Using AI-powered interview prep helped me stand out in the competitive landscape and secure my job in digital marketing.",
        "person": "Arjun Mehta",
        "role": "Digital Marketing Professional at Blink.it",
        "companyLogo": "https://d12araoe7z5xxk.cloudfront.net/landing-page/images/questionBank/company12.png",
        "tagColor": "#7B68EE"
    },
    {
        "tag": "Telecommunications",
        "quote": "Theresidentguy's structured feedback allowed me to refine my communication skills and successfully transition into a product marketing role.",
        "person": "Anita Desai",
        "role": "Product Marketing at MyJio",
        "companyLogo": "https://d12araoe7z5xxk.cloudfront.net/landing-page/images/questionBank/company13.png",
        "tagColor": "#40E0D0"
    },
    {
        "tag": "E-commerce",
        "quote": "The AI Interview Copilot boosted my confidence and helped me ace the interviews for a business analyst position.",
        "person": "Kiran Shah",
        "role": "Business Analyst at Zepto",
        "companyLogo": "https://d12araoe7z5xxk.cloudfront.net/landing-page/images/questionBank/company14.png",
        "tagColor": "#00FA9A"
    },
    {
        "tag": "Software",
        "quote": "Theresidentguy helped me refine my answers, giving me the confidence to secure a UX design role.",
        "person": "Hannah Wilson",
        "role": "UX Designer at Zoho",
        "companyLogo": "https://d12araoe7z5xxk.cloudfront.net/landing-page/images/questionBank/company15.png",
        "tagColor": "#90EE90"
    }
]

const companies = ["Ubs", "Airbnb", "Bain", "Bcg", "Canvas", "Cisco", "Citi", "Deloitte", "Discord", "Expedia", "Ey", "GoldMan", "InstaCart", "JpMorgan", "Kpmg", "LockheedMartin", "Mckinsey", "MorganStanley", "Pwc", "Stripe", "Tesla", "Tictok", "Twitch"]

const faqs = [
    {
        "question": "Is interview transcription available?",
        "answer":
            "In adherence to data privacy protection standards, Theresidentguy does not retain interview transcriptions. However, users have the option to access an Interview Report immediately following each session. It is important to note that if the 'View Interview Report' option is not selected upon session completion, retrieval of the report will not be possible at a later time.",
    },
    {
        "question": "What is the cancellation and refund policy?",
        "answer":
            "We offer a Satisfaction Guarantee. You can cancel your subscription anytime via your account or by contacting support. If you cancel, you'll retain access until the end of your billing cycle. Refunds are available, provided the service hasn't been substantially used. To request a refund, contact support with your details. Refunds will be processed within 7-10 business days. Certain exclusions apply, such as for services that have been heavily used.",
    },
    {
        "question": "What is the policy for the free trial?",
        "answer":
            "Our free trial offers users limited access to select product features, including AI resume revision and cover letter generation, among others. For the Interview Copilot feature, users are entitled to unlimited access to 5-minute free trial sessions. This means users can initiate the Interview Copilot as often as they wish, with each session being valid for up to 5 minutes.",
    },
    {
        "question": "Which domains/industries are supported by Theresidentguy?",
        "answer":
            "Our services offer extensive coverage across a variety of domains and industries. We are actively developing domain-specific knowledge bases to supercharge domain knowledges, encompassing areas such as Finance, Consulting, Marketing, Customer Success, Sales, Product Management, IT, Cyber Security, Data Analytics, Software Engineering, among others. For additional details or inquiries about specific domains, please reach out to our customer support.",
    },
    {
        "question": "What payment methods are available?",
        "answer":
            "Our goal is to ensure a smooth and convenient experience for our customers. We offer a wide range of payment options through our payment processing partner, Stripe. Accepted payment methods include major credit cards such as Visa, MasterCard, American Express, and Discover, as well as ACH transfers. For those interested in using cryptocurrencies, we kindly ask you to reach out to our customer support for further assistance.",
    },
    {
        "question": "Which online meeting platforms are supported by Theresidentguy?",
        "answer":
            "For optimal performance of Theresidentguy, we recommend using the platform on the latest version of the Chrome browser. The Interview Copilot feature is compatible with major online meeting platforms, including Zoom, WebEx, Microsoft Teams, Google Meet, and Chime, among others. For detailed instructions on how to configure the Interview Copilot for successful use, please visit our tutorial at /blog/how-to-set-up-interview-copilot.",
    },
    {
        "question": "What are the system requirements for running the Theresidentguy WebApp?",
        "answer":
            "Theresidentguy provides a comprehensive suite of AI-driven solutions designed to assist candidates during challenging recruitment periods. Our platform is accessible via an integrated Web App experience, optimized for use with the latest version of the Chrome browser to ensure the best possible user experience. While many of our AI tools, including AI Resume Revision and AI Cover Letter Generation, are compatible with various browsers, the Interview Copilot feature specifically requires the Chrome browser. To download the latest version of Chrome, please visit https://www.google.com/chrome/",
    }
]

const innovation = [
    {
        "quote": "Even on video interviews - with humans or robots - applicants can still call on AI programs to assist.",
        "author": "Alaina Demopoulos",
        "source": "@The Guardian",
        "sourceImage": "https://d12araoe7z5xxk.cloudfront.net/landing-page/images/the-guardian.png"
    },
    {
        "quote": "Most Innovative AI Recruitment Solutions Provider 2024",
        "author": "USA Business Excellence Rewards",
        "sourceImage": "https://d12araoe7z5xxk.cloudfront.net/landing-page/images/business-excellence.png"
    },
    {
        "quote": "Revolutionize your hiring process with cutting-edge technology like Theresidentguy!",
        "author": "Mohini S.",
        "source": "@LinkedIn",
        "sourceImage": "https://d12araoe7z5xxk.cloudfront.net/landing-page/images/linkedin.png"
    },
    {
        "quote": "Even on video interviews - with humans or robots - applicants can still call on AI programs to assist.",
        "author": "Alaina Demopoulos",
        "source": "@The Guardian",
        "sourceImage": "https://d12araoe7z5xxk.cloudfront.net/landing-page/images/the-guardian.png"
    },
    {
        "quote": "Most Innovative AI Recruitment Solutions Provider 2024",
        "author": "USA Business Excellence Rewards",
        "sourceImage": "https://d12araoe7z5xxk.cloudfront.net/landing-page/images/business-excellence.png"
    },
    {
        "quote": "Revolutionize your hiring process with cutting-edge technology like Theresidentguy!",
        "author": "Mohini S.",
        "source": "@LinkedIn",
        "sourceImage": "https://d12araoe7z5xxk.cloudfront.net/landing-page/images/linkedin.png"
    },
    {
        "quote": "Even on video interviews - with humans or robots - applicants can still call on AI programs to assist.",
        "author": "Alaina Demopoulos",
        "source": "@The Guardian",
        "sourceImage": "https://d12araoe7z5xxk.cloudfront.net/landing-page/images/the-guardian.png"
    },
    {
        "quote": "Most Innovative AI Recruitment Solutions Provider 2024",
        "author": "USA Business Excellence Rewards",
        "sourceImage": "https://d12araoe7z5xxk.cloudfront.net/landing-page/images/business-excellence.png"
    },
    {
        "quote": "Revolutionize your hiring process with cutting-edge technology like Theresidentguy!",
        "author": "Mohini S.",
        "source": "@LinkedIn",
        "sourceImage": "https://d12araoe7z5xxk.cloudfront.net/landing-page/images/linkedin.png"
    }
]

const tutorials = [
    {
        "title": "How to set up Interview Copilot®️ for Coding Interviews",
        "date": "Nov 30, 2023",
        "description": "This article is a detailed instruction on the settings of Interview Copilot for coding interviews. Interview Copilot works like a magical teleprompter for your online meetings. For coding interviews, an additional Chrome...",
        "image": "https://uploads-ssl.webflow.com/664ed8170ea9a09ebb0c8a24/66600a26dba53fd180d79ccf_tutor-2.webp",
    },
    {
        "title": "How to set up Interview Copilot for success",
        "date": "Sep 15, 2023",
        "description": "This article is a detailed instruction on the settings of Interview Copilot®️. Interview Copilot generates actionable guidance and personalized support for your online interviews in real-time....",
        "image": "https://uploads-ssl.webflow.com/664ed8170ea9a09ebb0c8a24/66600a219df7b007852f2ffd_tutor-1.webp",
    },
    {
        "title": "How to use AI Mock Interview",
        "date": "Feb 01, 2024",
        "description": "A detailed instruction on the settings of AI Mock Interview. Theresidentguy helps you effectively prepare and practice interviews for your target job positions in a highly immersive manner....",
        "image": "https://uploads-ssl.webflow.com/664ed8170ea9a09ebb0c8a24/66600a2f3a18a3d052de1c06_tutor-4.webp",
    },
    {
        "title": "How to use AI Material Generator",
        "date": "Feb 01, 2024",
        "description": "A detailed instruction on the settings of AI Material Generator. Theresidentguy helps you automatically create job application materials such as resume, cover letters, and interview Q&A flashcards, tailored to the job yo...",
        "image": "https://uploads-ssl.webflow.com/664ed8170ea9a09ebb0c8a24/66600a2aa990e4c75da6fe07_tutor-3.webp",
    }
]

const askedQuestion = [
    {
        "question": "What is the Theresidentguy Referral Program?",
        "answer": "The Theresidentguy Referral Program is a way for our users to earn rewards by referring friends, colleagues, or anyone interested in improving their interview skills using our AI-powered tools and land dream jobs. Each successful referral earns you exciting rewards, including discounts, free access, or gift cards."
    },
    {
        "question": "How do I participate in the referral program?",
        "answer": "To participate, simply log into your Theresidentguy account and navigate to the referral section. From there, you can share your unique referral link via email, social media, or any other platform. When someone uses your link to sign up and makes a subscription, you'll receive a reward. The exact rewards may vary depending on the promotion and will be clearly outlined in the referral program details."
    },
    {
        "question": "How can I track my referrals and rewards?",
        "answer": "You can track your referrals and rewards by logging into your Theresidentguy account and visiting the referral dashboard. Here, you'll see the status of each referral, including whether they've signed up and made a qualifying subscription."
    },
    {
        "question": "Is there a limit to how many people I can refer?",
        "answer": "No, there is no limit to how many people you can refer. The more people you refer, the more rewards you can earn!"
    },
    {
        "question": "What qualifies as a successful referral?",
        "answer": "A referral is considered successful when the person you referred signs up using your unique referral link and completes a purchase of one of our eligible subscription plans."
    },
    {
        "question": "When will I receive my referral rewards?",
        "answer": "Referral rewards are typically credited to your account once the referred user completes their purchase and any associated trial periods have passed. This process usually takes a few business days but can vary depending on the specific terms of the promotion."
    },
    {
        "question": "Can I refer myself or someone in my household?",
        "answer": "Self-referrals are not allowed, and referrals within the same IP address would not qualify. Please review the referral program terms and conditions for specific details."
    },
    {
        "question": "What happens if my referral doesn't complete their subscription?",
        "answer": "If your referral doesn't complete a qualifying subscription, you won't receive a reward. However, your referral link will remain active, and you can continue to encourage them to complete their subscription."
    },
    {
        "question": "Who can I contact if I have questions about the referral program?",
        "answer": "If you have any questions or need assistance with the referral program, please contact our support team through the Theresidentguy website customer support chatbot or support@finalroundai.com, and we'll be happy to help."
    }
]

const interviewCopilot = [
    {
        "logo": "/image/icons/google.png",
        "position": "Associate",
    },
    {
        "logo": "/image/icons/google.png",
        "position": "Business Operations",
    },
    {
        "logo": "/image/icons/salesforce.png",
        "position": "Data Scientist",
    },
    {
        "logo": "/image/icons/microsoft.png",
        "position": "AI Engineer",
    },
    {
        "logo": "/image/icons/netflix.png",
        "position": "Platform Engineer",
    },
    {
        "logo": "/image/icons/openai.png",
        "position": "Research Engineer",
    },
    {
        "logo": "/image/icons/mckinsey.png",
        "position": "Consultant",
    },
    {
        "logo": "/image/icons/pwc.png",
        "position": "Platform Engineer",
    },
    {
        "logo": "/image/icons/pg.png",
        "position": "Social Media Associate",
    }
]


export { testimonials, companies, faqs, innovation, tutorials, askedQuestion, interviewCopilot }