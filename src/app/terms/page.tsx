import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";

const prohibitedItems = [
  "Alcoholic Beverages, Liquor, tobacco products, drugs, psychotropic substances, narcotics, intoxicants of any description, medicines, palliative/curative substances nor shall you provide link directly or indirectly to or include descriptions of items, products or services that are prohibited under any applicable law including but not limited to the Drugs and Cosmetics Act, 1940, the Drugs and Magic Remedies Act, 1954, Narcotic Drug and Prohibited Substances Act and the Indian Penal Code, 1860.",
  "Dead person and/or the whole or any part of any human which has been kept or preserved by any means whether artificial or natural including any blood, bodily fluids and/or body parts.",
  "Dead creatures and/or the whole or any part of any animal which has been kept or preserved by any means whether artificial or natural including rugs, skins, specimens of animals, antlers, horns, hair, feathers, nails, teeth, musk, eggs, nests, and other animal products prohibited under The Wildlife Protection Act, 1972 and/or The Environment Protection Act, 1986.",
  "Prostitution or any other service in nature thereof that purports to violate the provisions of Immoral Act or Indecent representation of women.",
  "Obscene items including any publication or film or item that depicts a minor under 18, and any computer games not suitable for minors.",
  "Idols of any religion belonging to Temples/Religious institutions, artifacts, etc., or any information likely to affect the religious sentiments of any person or group.",
  '"Antiquities" and "Art Treasures" in violation of the Antiquities and Art Treasures Act, 1972.',
  "Fraudulent information, misrepresenting the nature and use of the products or the services.",
  "Counterfeit, Pirated, and stolen products or unauthorized illegal services.",
  "Products or Services that are defamatory, libellous, threatening, or abusive in nature.",
  "Hazardous chemicals and pesticides and/or items in violation of Hazardous Chemicals Act, 1985.",
  "Destructive Devices and Explosives including any material that enables blast and explosive devices.",
  "Any hate content, derogatory or slanderous in nature directed to any individual or group or advocating violence.",
  '"Securities" within the meaning of the Securities Contract Regulation Act, 1956, including shares, bonds, debentures, etc.',
  "Identity Documents, Personal Financial Records & Personal Information (in any form, including mailing lists).",
  "Computer viruses of any type or any program that facilitates hacking with intent to damage a computer or intercept personal data.",
  "Government emblems, insignia, and/or items in violation of Emblems and Names (Prevention of improper use) Act, 1950 and/or Flag Codes of India Act, 2002.",
  "Products listed in violation of the Food Adulteration Act, 1954.",
  "Products and services that infringe any third party's intellectual property or rights of publicity or moral rights.",
  "Weapons and related items (firearms, firearm parts, magazines, ammunition, tear gas, stun guns, switchblade knives, or any item prohibited under the Indian Arms Act, 1959).",
  "Any viruses, Trojan horses, worms, time bombs, or other computer programming routines that may damage, detrimentally interfere with, or intercept any system, data, or personal information.",
  "Spam, abusive, duplicate listings, fraud schemes (e.g. 'Get rich', 'Double the Money' scams).",
];

const adInfoItems = [
  "Shall not be defamatory, trade libelous, unlawfully threatening, or unlawfully harassing. Further shall not be fraudulent, misrepresenting, misleading, or pertain to the promotion of any illegal, counterfeit, stolen products and/or services.",
  '"Pyramid schemes" and "Multilevel Marketing" and/or similar scams which are solely listed for the purpose of defrauding users.',
  "Any kind of promotion or sale of any commodity or any product.",
  "Shall not libel anyone or include hate, derogatory, slanderous speech directed at individuals or groups. You should not advocate violence against other users or individuals or groups.",
];

const yourInfoItems = [
  "Shall not be fraudulent, misrepresent, mislead or pertain to the sale of any illegal, counterfeit, stolen products and/or services.",
  "Shall not consist of material that is an expression of bigotry, racism, or hatred based on age, gender, race, religion, caste, class, lifestyle preference, and nationality.",
  "Shall not be obscene, contain pornography, or contain 'indecent representation of women' within the meaning of the Indecent Representation of Women (Prohibition) Act, 1986.",
  "Shall not pertain to Products or Services of which you are not the lawful owner or you do not have the authority or consent to list.",
  "Shall not infringe any intellectual property, trade secret, or other proprietary right or rights of publicity or privacy of any third party.",
  "Shall not distribute or contain spam, multiple/chain letters, or pyramid schemes in any of its forms.",
  "Shall not distribute viruses or any other technologies that may harm ELK or the interests or property of ELK users.",
  "You consent to receive communications by email, SMS, call, or by such other mode of communication related to the services provided through the website.",
  "Shall not, directly or indirectly, offer, attempt to offer, trade, or attempt to trade in any products and services, the dealing of which is prohibited or restricted under any applicable law.",
  "Shall not list or post or pertain to information that is either prohibited or restricted under the laws of the Republic of India.",
];

const consequenceItems = [
  "Permanent blocking of access to the site.",
  "Suspension or termination of Prosper ID/membership.",
  "Reporting to Law Enforcement or Appropriate Authorities.",
];

const bannerItems = [
  "Individual or Business entities indulging in Rental Products or Freelancing Services can promote their business by obtaining the Banner space by paying the fixed cost.",
  "Banners can be created for future dates only, from the next day onwards to a maximum of 30 days.",
  "Banners will be visible to all users logging in to the Application/Website from the respective cities for which the Banner was hoisted.",
  "Individual Users or Business entities having a minimum of one valid live ad can only create Banner advertisements.",
  "Individuals or Companies can only promote Business and relevant details on Banners. ELK holds the authority to edit, modify and remove the content as per the Ad posting policy in section 2.",
  "The cost of the Banner will be different for each city and ELK holds the full rights over the rental fee of the Banner for respective cities.",
  "ELK holds the authority to publish or reject any banners based on the guidelines mentioned in sections 2 and 2A.",
  "Company Logo or Product images of the respective advertiser will only be published; photos of any person will not be allowed on the Banner.",
  "The rental fee paid for the Banner is not entitled to be refunded if deactivated by the user.",
  "A banner hoisted for any day will be displayed on the ELK front end from 12 AM to 11:59 PM of the appropriate day.",
  "ELK holds the right to reject a Banner not complying with Banner posting protocols and the fee paid will be refunded in this scenario.",
  "ELK never guarantees the surge of Business inquiries since business inquiries depend upon the market demands of the appropriate cities.",
];

const boostItems = [
  "There are two options in the Boost Ads segment: 1. Top of the Page. 2. Premium Ads.",
  "Any Active ads could be Boosted by the user to the Top of the Page or Premium according to their choices.",
  "Individual Users or Business entities having a minimum of one valid live ad can avail of this value-added service.",
  'The "Top of the Page" option can be availed for 2, 4, and 6 days maximum whereas the Premium option can be chosen for 3, 5, and 7 days only. ELK reserves the right to edit, modify and change the pattern including charges and number of days.',
  "The charges paid for the Boost Ad are not entitled to be refunded on any occasion.",
  "The cost of the Top of the Page and Premium options will be different for each city and ELK holds full rights over the charges.",
  'The "top of the page" boosted ad will be pinned on top of the page in the appropriate Product or Service category for the selected dates and will be visible to all users from the respective cities.',
  "Ad Boosted for one day will be promoted on the home of Product/service category pages till the same day 11:59 PM only.",
  "ELK never guarantees the surge of Business inquiries as business inquiries depend upon the market demands of the appropriate cities.",
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 px-[5%] max-w-[860px] mx-auto">
        {/* Header */}
        <div className="mb-12 pt-8">
          {/* <span className="inline-block bg-teal-light text-teal text-[0.75rem] font-bold uppercase tracking-[0.1em] px-4 py-1.5 rounded-full mb-4">
            Legal
          </span> */}
          <h1 className="font-serif font-black text-[clamp(2rem,4vw,2.8rem)] text-ink leading-tight mb-3">
            Terms of Service
          </h1>
          <p className="text-ink-soft text-[0.9rem]">Acceptable Use Policy (AUP)</p>
        </div>

        {/* Intro callout */}
        <div className="bg-yellow-light border border-yellow/30 rounded-[14px] p-6 mb-10 text-[0.95rem] text-ink leading-[1.7]">
          Welcome to ELK. These are the Terms and Conditions governing your use of the Website (hereinafter referred to as Acceptable Use Policy &ldquo;AUP&rdquo;). By accessing ELK either through the website or any other electronic device, you acknowledge, accept and consent to the accompanying terms of the AUP. This AUP is effective from the time you sign in to ELK. By accepting this AUP, you are also accepting and agreeing to be bound by the Privacy Policy and the Listing Policy.
        </div>

        <div className="flex flex-col gap-10 text-[0.95rem]">

          {/* 1 */}
          <Section title="1. Using ELK">
            By using ELK, you acknowledge and agree that it is a technology-enabled electronic platform for advertising information about products and services. You understand that we do not endorse, market, or guarantee any products or services posted or listed on our site. We do not possess or distribute any products or services mentioned on our platform. While interacting with other users regarding any ad listings or information, we strongly encourage you to exercise reasonable diligence as you would in offline transactions. Use judgment and common sense before renting, buying, or hiring any products or services. When using ELK&apos;s classifieds, discussion forums, comments, feedback, or other services, you agree to post in the appropriate category and adhere to the Acceptable Use Policy (AUP), including the Ad Posting Policy.
          </Section>

          {/* 1A */}
          <Section title="1A. Prosper ID">
            On successful login, the System will allot an Alpha Numeric ID (e.g., AB1234) which will be issued to you without rental cost. You are considered the possessor of that free allotted Prosper ID only during its possession period and it will act as your identification on ELK.
          </Section>

          {/* 2 */}
          <Section title="2. Ad Posting Policy">
            To use our website, app, and other services, you confirm and agree that you will not list, post, or provide information regarding the rental or exchange of products and services, or any content that is illegal under the laws of the Republic of India, as specified in the prohibited items policy below.
          </Section>

          {/* 2A */}
          <Section title="2A. Prohibited Items Policy">
            <p className="text-ink-soft leading-[1.8] mb-4">The following items are prohibited:</p>
            <BulletList items={prohibitedItems} />
          </Section>

          {/* 2B */}
          <Section title="2B. Ad/Banners Posting, Information, Advertisement">
            <BulletList items={adInfoItems} />
          </Section>

          {/* 2C */}
          <Section title="2C. Additional Listing Policies">
            <p className="text-ink-soft leading-[1.8] mb-4">In addition to the above, all Users shall adhere to and comply with the following Policies while listing items:</p>
            <BulletList items={[
              "Duplicate Ad listings are not allowed. Any ad posted more than once with the same content or Title in the same city and category would be considered as a Duplicate Ad. All duplicate ads would be deleted and posters penalized if the problem persists.",
              "Restricted Item Policy: Users shall adhere to and comply with the restricted items policy while listing, posting or providing information in relation to any products or services.",
              "Mature Audience/Sexually oriented material: Classifieds relating to items intended for use in sexual activity would not be permitted.",
            ]} />
          </Section>

          {/* 3 */}
          <Section title="3. Consequences of Breach of Listing Policy">
            <p className="text-ink-soft leading-[1.8] mb-4">Users who violate the prohibited items policy and/or the restricted items policy may be subject to the following actions:</p>
            <BulletList items={consequenceItems} />
          </Section>

          {/* 3A */}
          <Section title='3A. "Your Information"'>
            &ldquo;Your Information&rdquo; is defined as any information you provide to us or other users during the registration, posting, listing, or replying process of classifieds, in the feedback area, through discussion forums, or in the course of using any other feature of the Services. You agree that you are the lawful owner having all rights, title, and interest in your information, and that you are solely responsible and accountable for Your Information, and that we act as a mere platform for your online distribution and publication of Your Information.
          </Section>

          {/* 3B */}
          <Section title="3B. You agree that your Ad listing, posting, and/or Information">
            <BulletList items={yourInfoItems} />
            <p className="text-ink-soft leading-[1.8] mt-4">
              If you are registering on the Website/App, you are responsible for maintaining the confidentiality of your User ID, password, email address and for restricting access to your ELK account. You are responsible for all activities that occur under your User ID and password.
            </p>
          </Section>

          {/* 3C */}
          <Section title="3C. Prohibited Rentals">
            The renting of items prohibited under Indian law is strictly forbidden on the ELK platform. The renting of motor vehicles on the ELK platform must be in accordance with the Indian Motor Vehicles Act.
          </Section>

          {/* 4 */}
          <Section title="4. Value Added Services">
            ELK offers several value-added services for users who want to promote their products or services to gain special attention from viewers and receive more business inquiries. These services are optional, and ELK never pressures any user to utilize them. ELK reserves the complete rights to edit, modify, remove or introduce new value-added services in the future.
          </Section>

          {/* 4A */}
          <Section title="4A. Prosper ID">
            <BulletList items={[
              "On successful login, the System will allot an Alpha Numeric ID (e.g., AB1234) which will be issued to you without rental cost.",
              "You are considered the possessor of that free allotted Prosper ID only during its possession period and it will act as your identification on ELK.",
              "Entering the Prosper ID on URL or on the Search tab on Android/iOS app will display only the Ads pertaining to that corresponding Prosper ID.",
            ]} />
          </Section>

          {/* 4B */}
          <Section title="4B. Banner Promotions">
            <BulletList items={bannerItems} />
          </Section>

          {/* 4C */}
          <Section title="4C. Boost Ads">
            <BulletList items={boostItems} />
          </Section>

          {/* 5 */}
          <Section title="5. Eligibility">
            The use of ELK is restricted to individuals who are citizens of the Republic of India, are 18 years of age or older, and are legally capable of entering into binding contracts. If you access ELK on behalf of a legal entity, you confirm that you are fully authorized to do so, and any listings, postings, or information placed on the site on behalf of the legal entity are your responsibility.
          </Section>

          {/* 6 */}
          <Section title="6. Abuse of ELK">
            You agree to inform us if you come across any listing or posting that is offensive or violates our listing policy or infringes any intellectual property rights by contacting{" "}
            <a href="mailto:support@elkbusinesshub.com" className="text-teal">support@elkbusinesshub.com</a>. We reserve the right to take down any posting, listing, or information and limit or terminate our services and take all reasonable technical and legal steps to prevent the misuse of the Site.
          </Section>

          {/* 7 */}
          <Section title="7. Violations by User">
            You agree that in the event your listing, posting, or your information violates any provision of this AUP or the listing policy, we shall have the right to terminate and/or suspend your membership of the Site and refuse to provide you or any person acting on your behalf, access to the Site.
          </Section>

          {/* 8 */}
          <Section title="8. Content">
            The Site contains content that includes your information, ELK&apos;s information, and information from other users. You agree not to copy, modify, or distribute such content (other than your information), ELK&apos;s copyrights, or trademarks. When you give us any content as part of your information, you are granting us a non-exclusive, worldwide, perpetual, irrevocable, royalty-free, sub-licensable right and license to use, reproduce, publish, translate, distribute, perform, and display such content worldwide through the Site as well as on any of our affiliates or partners websites, publications, and mobile platform.
          </Section>

          {/* 9 */}
          <Section title="9. Liability">
            You agree not to hold ELK or any of its officers, employees, agents responsible or accountable for any of your Ad postings or information. We do not guarantee the accuracy or legitimacy of any Ad posting or information by other users. You further agree that we are not liable for any loss of money, goodwill, or reputation, or any special, indirect, or consequential damages arising out of your use of the site or as a result of any rental deal of products and services with other users of the site.
          </Section>

          {/* 10 */}
          <Section title="10. Personal Information">
            By using ELK, you agree to the collection, transfer, storage, and use of any personal information provided by you on the Site by ELK. The data is stored and controlled on servers located in India as further described in our Privacy Policy. By submitting your Ad listings or Freelance Job Postings, you permit ELK to publicly display your information which can be freely accessed by anyone. You may send questions about this policy to{" "}
            <a href="mailto:support@elkbusinesshub.com" className="text-teal">support@elkbusinesshub.com</a>.
          </Section>

          {/* 11 */}
          <Section title="11. General">
            We may update this AUP or the listing policy at any time and may notify you of such updates via soft Notifications or through email communications. The modified AUP and/or Listing Policy shall come into effect either at the time you place your next Ad posting, listing, or information on the Site or after a period of 14 days from the date of the update, whichever is sooner.
          </Section>

          {/* 12 */}
          <Section title="12. Third Party Content and Services">
            ELK may provide, on its site, links to sites operated by other entities. If the user decides to view this site, they shall do so at their own risk. ELK makes no warranty or representation regarding, and does not endorse any linked website or the information appearing thereon or any of the products or services described thereon. User&apos;s interactions with organizations and/or individuals found on or through the service are solely between the user and such organization and/or individual.
          </Section>

          {/* 13 */}
          <Section title="13. Indemnity">
            The User agrees to indemnify and hold ELK, its officers, subsidiaries, affiliates, successors, assigns, directors, officers, agents, service providers, suppliers, and employees, harmless from any claim or demand, including reasonable attorney fees and court costs, made by any third party due to or arising out of content submitted by the user, violation of the Terms and Conditions, breach of any representations and warranties herein, or violation of any rights of another.
          </Section>

          {/* 14 */}
          <Section title="14. Governing Law & Jurisdiction">
            This AUP and the Listing Policy shall be governed and construed in accordance with the laws of the Republic of India, which shall have exclusive jurisdiction on all matters and disputes arising out of and relating to the Site.
          </Section>

          {/* 15 */}
          <Section title="15. No Guarantee of Business">
            ELK does not guarantee business from the leads generated. ELK shall not be responsible or liable if no business or business leads are generated for the Advertiser through Top of the Page/Premium ads on the Website/app. Accuracy of the information/content provided is the advertiser&apos;s responsibility and ELK will not be held responsible for false claims made by the advertiser.
          </Section>

          {/* 16 */}
          <Section title="16. Advertiser Obligations">
            Advertiser represents and warrants that (i) it is a bonafide business organization or individual, (ii) it has the right to use the trademarks it claims, (iii) the business carried on does not violate or infringe upon any law or regulation, and (iv) all Classified(s) provided to ELK are and shall at all times be accurate, complete, and entirely lawful. The Advertiser shall bear complete responsibility for the quality of its products and/or services, and ELK shall bear no responsibility for the same.
          </Section>

          {/* 17 */}
          <Section title="17. Notice of Infringement of Intellectual Property">
            ELK is not liable for any infringement of intellectual property rights arising out of Products & Services posted on the site by end-users or any other third parties. If you believe any Content infringes upon your intellectual property rights, you may write to us at{" "}
            <a href="mailto:support@elkbusinesshub.com" className="text-teal">support@elkbusinesshub.com</a> to delete the relevant Content in good faith.
          </Section>

          {/* 18 */}
          <Section title="18. Cautions & Disclaimers">
            <BulletList items={[
              "We strongly recommend our users exercise their discretion & due diligence about all relevant aspects prior to availing of any products/services. ELK does not implicitly or explicitly endorse any product/s or services provided by advertisers/service providers.",
              "Service providers at all times ensure that all the applicable laws that govern their profession are followed while rendering their services.",
              "We strongly advise the users to upload the images of their original product and their own images while posting Ads. ELK shall not be responsible for third-party images downloaded or used by the users while posting their Ads. ELK also reserves the right to edit/update/correct/delete/add watermarks on any images uploaded by the users.",
              "The information related to the name, address, contact details of the business establishments has been verified as existing at the time of verification of any advertiser with ELK.",
              "ELK is not responsible for any disputes arising due to fraudulent activities, deceptive/misleading misbehavior, or cheating by the other User. However, Users can escalate to support@elkbusinesshub.com to complain about the particular Post/User.",
            ]} />
          </Section>

          {/* 19 */}
          <Section title="19. Miscellaneous">
            <BulletList items={[
              "If all premium ads available to the advertiser under the subscription scheme are not used/availed of during the period of these terms, the unutilized units shall be forfeited — no refund shall be made.",
              "The banner shall be dynamically created by Users from their dashboard. Banner hoisting is a paid service and the banners will be displayed on a rotational basis. ELK reserves the right to approve/reject the banner and does not provide any guarantees of impressions or clicks on the banners.",
              "Premium ads are prioritized over free ads on the website on the search and browse pages. The sequence in which premium ads are displayed will be controlled by ELK's search algorithm which is ELK's sole prerogative.",
              "The advertiser acknowledges that any liability/claim in respect of the products or services promoted through the Banners/Advertisements shall be solely to the account of the advertiser. In case of any claims against ELK, the advertiser shall indemnify ELK against all such claims and damages.",
              "Advertiser shall procure and keep valid all necessary licenses, permissions, authorizations, consents, approvals, and registrations required for it to perform the Services and bear sole and exclusive responsibility for all compliances.",
            ]} />
          </Section>

        </div>

        <div className="mt-14 pt-8 border-t border-beige-dark text-[0.85rem] text-ink-soft">
          ELK Business Hub ·{" "}
          <a href="mailto:support@elkbusinesshub.com" className="text-teal">
            support@elkbusinesshub.com
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-bold text-[1.05rem] text-ink mb-3 pb-2 border-b border-beige-dark">
        {title}
      </h2>
      <div className="text-ink-soft leading-[1.8]">{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5 mt-1">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 items-start">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
