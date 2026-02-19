/* =========================================
   Legal Question Tracker — Application
   Rommaana Founders Agreement Defense
   ========================================= */

(function () {
    'use strict';

    // ─── Utility ────────────────────────────
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
    const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

    // ─── i18n Translation System ────────────
    const LANG_KEY = 'rommaana_lang';
    let currentLang = localStorage.getItem(LANG_KEY) || 'en';

    const translations = {
        en: {
            // Sidebar
            sidebarTitle: 'Rommaana',
            sidebarSubtitle: 'Legal Defense Tracker',
            navOverview: 'Overview',
            navDashboard: 'Dashboard',
            navLawyers: 'Lawyers',
            navDocuments: 'Documents',
            navCompare: 'Compare Answers',
            navRedFlags: 'Red Flags',
            navVesting: 'Vesting Start',
            navArticle80: 'Article 80 Trap',
            navFakeDebt: 'Fake Debt',
            navNominal: 'Nominal Value',
            navCurePeriod: '10-Day Cure',
            navSpanish: 'Spanish Amendment',
            navDocumentation: 'Documentation',
            docLibraryTitle: 'Documentation Library',
            relatedDocuments: 'Related Documents',
            noRelatedDocs: 'No related documents found.',
            imageLoadError: 'Image could not be loaded. The link may have expired.',

            // Language toggle
            langToggleLabel: 'عربي',

            // Dashboard
            dashboardTitle: 'Defense Dashboard',
            dashboardDesc: 'Track the 6 red flags in Gustavo\'s Founders Agreement draft. Get each confirmed as "Non-Standard" by your lawyers.',
            statUnresolved: 'Unresolved',
            statInProgress: 'In Progress',
            statResolved: 'Resolved',
            statLawyers: 'Lawyers',
            statAnswersRecorded: 'Answers Recorded',
            question: 'question',
            questions: 'questions',
            answer: 'answer',
            answers: 'answers',

            // Status
            statusUnresolved: '🔴 Unresolved',
            statusInProgress: '🟡 In Progress',
            statusResolved: '🟢 Resolved',
            statusLabel: 'Status:',
            statusBadgeUnresolved: 'unresolved',
            statusBadgeInProgress: 'in progress',
            statusBadgeResolved: 'resolved',

            // Pain Point Detail
            backToDashboard: '← Back to Dashboard',
            evidence: 'Evidence',
            answersLabel: 'ANSWERS',
            addAnswer: '+ Add Answer',
            noAnswersYet: 'No answers recorded yet. Add a lawyer and record their response.',

            // Lawyers
            lawyersTitle: 'Lawyers',
            lawyersDesc: 'Manage your legal consultants. Compare their responses across all questions.',
            addLawyerBtn: '+ Add Lawyer',
            noLawyersTitle: 'No lawyers added yet',
            noLawyersDesc: 'Add your first lawyer to start tracking consultations.',
            answersRecorded: 'answer(s) recorded',
            editBtn: '✏️ Edit',
            deleteBtn: '🗑️ Delete',
            independent: 'Independent',

            // Documents
            documentsTitle: 'Evidence Documents',
            documentsDesc: 'Your legal proof that the draft is factually incorrect and legally dangerous. Track which lawyers have reviewed each document.',
            addDocBtn: '+ Add Document',
            keySection: 'Key Section',
            sharedWith: 'Shared with:',
            addLawyersFirst: 'Add lawyers first',

            // Compare
            compareTitle: 'Compare Answers',
            compareDesc: 'Side-by-side comparison of all lawyers\' responses for each question. Identify consensus and disagreements.',
            filterByPainPoint: 'Filter by Pain Point',
            allQuestions: 'All Questions',
            addLawyersFirstCompare: 'Add lawyers first',
            addLawyersFirstCompareDesc: 'You need at least one lawyer to compare answers.',
            noQuestionsFound: 'No questions found.',
            noAnswer: '— no answer —',
            questionHeader: 'Question',

            // Lawyer Modal
            addLawyerTitle: 'Add Lawyer',
            editLawyerTitle: 'Edit Lawyer',
            labelFullName: 'Full Name *',
            labelFirm: 'Firm / Organization',
            labelSpecialization: 'Specialization',
            placeholderSpec: 'e.g. Corporate Law, KSA Companies Law',
            labelConsultDate: 'Consultation Date',
            labelPhone: 'Phone',
            labelEmail: 'Email',
            labelNotes: 'Notes',
            placeholderNotes: 'e.g. Referred by Monsha\'at, specializes in partner disputes...',
            cancelBtn: 'Cancel',
            saveLawyerBtn: 'Save Lawyer',

            // Answer Modal
            answerModalTitle: 'Record Lawyer\'s Answer',
            labelQuestion: 'Question',
            labelSelectLawyer: 'Select Lawyer *',
            selectLawyerPlaceholder: '— Select Lawyer —',
            labelLawyerAnswer: 'Lawyer\'s Answer *',
            placeholderAnswer: 'Record the lawyer\'s response here...',
            labelRecommendation: 'Recommendation',
            selectDefault: '— Select —',
            recRedFlag: '🔴 Red Flag / Non-Standard',
            recCaution: '🟡 Caution / Needs Modification',
            recSafe: '🟢 Acceptable / Standard',
            saveAnswerBtn: 'Save Answer',

            // Document Modal
            addDocTitle: 'Add Document',
            editDocTitle: 'Edit Document',
            labelDocName: 'Document Name *',
            placeholderDocName: 'e.g. Employment Contract',
            labelFileName: 'File Name',
            placeholderFileName: 'e.g. employment_contract.pdf',
            labelDescription: 'Description',
            placeholderDocDesc: 'What this document proves and what section to show the lawyer...',
            labelKeySection: 'Key Section',
            placeholderKeySection: 'e.g. Article 6 (Capital)',
            labelQuestionToAsk: 'Question to Ask',
            placeholderQuestionToAsk: 'What question should you ask the lawyer about this document?',
            saveDocBtn: 'Save Document',
            viewDoc: 'View Content',

            // Alerts
            alertDeleteLawyer: 'Delete this lawyer? Their answers will remain but show as "Unknown Lawyer."',
            alertDeleteAnswer: 'Delete this answer?',
            alertDeleteDoc: 'Delete this document?',
            alertAddLawyerFirst: 'Please add a lawyer first (go to the Lawyers section).',
            alertSelectLawyer: 'Please select a lawyer.',
            alertEnterAnswer: 'Please enter the answer.',

            // Misc
            unknownLawyer: 'Unknown Lawyer',
            recLabelRedFlag: '🔴 Red Flag / Non-Standard',
            recLabelCaution: '🟡 Caution',
            recLabelSafe: '🟢 Acceptable',
        },
        ar: {
            // Sidebar
            sidebarTitle: 'رمّانة',
            sidebarSubtitle: 'متتبع الدفاع القانوني',
            navOverview: 'نظرة عامة',
            navDashboard: 'لوحة التحكم',
            navLawyers: 'المحامون',
            navDocuments: 'المستندات',
            navCompare: 'مقارنة الإجابات',
            navRedFlags: 'إشارات الخطر',
            navVesting: 'بداية الاستحقاق',
            navArticle80: 'فخ المادة 80',
            navFakeDebt: 'الدين الوهمي',
            navNominal: 'القيمة الاسمية',
            navCurePeriod: 'مهلة 10 أيام',
            navSpanish: 'التعديل الإسباني',
            navDocumentation: 'الوثائق',
            docLibraryTitle: 'مكتبة الوثائق',
            relatedDocuments: 'الوثائق ذات الصلة',
            noRelatedDocs: 'لم يتم العثور على وثائق ذات صلة.',
            imageLoadError: 'تعذر تحميل الصورة. ربما انتهت صلاحية الرابط.',

            // Language toggle
            langToggleLabel: 'EN',

            // Dashboard
            dashboardTitle: 'لوحة الدفاع',
            dashboardDesc: 'تتبع الإشارات الحمراء الـ 6 في مسودة اتفاقية المؤسسين من غوستافو. احصل على تأكيد "غير معياري" من محاميك.',
            statUnresolved: 'لم تُحل',
            statInProgress: 'قيد التنفيذ',
            statResolved: 'تم الحل',
            statLawyers: 'المحامون',
            statAnswersRecorded: 'إجابات مسجلة',
            question: 'سؤال',
            questions: 'أسئلة',
            answer: 'إجابة',
            answers: 'إجابات',

            // Status
            statusUnresolved: '🔴 لم تُحل',
            statusInProgress: '🟡 قيد التنفيذ',
            statusResolved: '🟢 تم الحل',
            statusLabel: 'الحالة:',
            statusBadgeUnresolved: 'لم تُحل',
            statusBadgeInProgress: 'قيد التنفيذ',
            statusBadgeResolved: 'تم الحل',

            // Pain Point Detail
            backToDashboard: '→ العودة إلى لوحة التحكم',
            evidence: 'الأدلة',
            answersLabel: 'الإجابات',
            addAnswer: '+ إضافة إجابة',
            noAnswersYet: 'لا توجد إجابات مسجلة بعد. أضف محامياً وسجّل رده.',

            // Lawyers
            lawyersTitle: 'المحامون',
            lawyersDesc: 'إدارة المستشارين القانونيين. قارن ردودهم عبر جميع الأسئلة.',
            addLawyerBtn: '+ إضافة محامٍ',
            noLawyersTitle: 'لم يتم إضافة محامين بعد',
            noLawyersDesc: 'أضف أول محامٍ لبدء تتبع الاستشارات.',
            answersRecorded: 'إجابة مسجلة',
            editBtn: '✏️ تعديل',
            deleteBtn: '🗑️ حذف',
            independent: 'مستقل',

            // Documents
            documentsTitle: 'مستندات الإثبات',
            documentsDesc: 'أدلتك القانونية على أن المسودة غير صحيحة وخطيرة قانونياً. تتبع المحامين الذين راجعوا كل مستند.',
            addDocBtn: '+ إضافة مستند',
            keySection: 'القسم الرئيسي',
            sharedWith: 'تمت المشاركة مع:',
            addLawyersFirst: 'أضف محامين أولاً',

            // Compare
            compareTitle: 'مقارنة الإجابات',
            compareDesc: 'مقارنة جنباً إلى جنب لردود جميع المحامين لكل سؤال. حدد الإجماع والاختلافات.',
            filterByPainPoint: 'تصفية حسب نقطة الألم',
            allQuestions: 'جميع الأسئلة',
            addLawyersFirstCompare: 'أضف محامين أولاً',
            addLawyersFirstCompareDesc: 'تحتاج إلى محامٍ واحد على الأقل لمقارنة الإجابات.',
            noQuestionsFound: 'لم يتم العثور على أسئلة.',
            noAnswer: '— لا توجد إجابة —',
            questionHeader: 'السؤال',

            // Lawyer Modal
            addLawyerTitle: 'إضافة محامٍ',
            editLawyerTitle: 'تعديل محامٍ',
            labelFullName: 'الاسم الكامل *',
            labelFirm: 'المكتب / المنظمة',
            labelSpecialization: 'التخصص',
            placeholderSpec: 'مثال: القانون التجاري، نظام الشركات السعودي',
            labelConsultDate: 'تاريخ الاستشارة',
            labelPhone: 'الهاتف',
            labelEmail: 'البريد الإلكتروني',
            labelNotes: 'ملاحظات',
            placeholderNotes: 'مثال: تمت الإحالة من منشآت، متخصص في نزاعات الشركاء...',
            cancelBtn: 'إلغاء',
            saveLawyerBtn: 'حفظ المحامي',

            // Answer Modal
            answerModalTitle: 'تسجيل إجابة المحامي',
            labelQuestion: 'السؤال',
            labelSelectLawyer: 'اختر المحامي *',
            selectLawyerPlaceholder: '— اختر المحامي —',
            labelLawyerAnswer: 'إجابة المحامي *',
            placeholderAnswer: 'سجّل رد المحامي هنا...',
            labelRecommendation: 'التوصية',
            selectDefault: '— اختر —',
            recRedFlag: '🔴 إشارة خطر / غير معياري',
            recCaution: '🟡 تحذير / يحتاج تعديل',
            recSafe: '🟢 مقبول / معياري',
            saveAnswerBtn: 'حفظ الإجابة',

            // Document Modal
            addDocTitle: 'إضافة مستند',
            editDocTitle: 'تعديل مستند',
            labelDocName: 'اسم المستند *',
            placeholderDocName: 'مثال: عقد العمل',
            labelFileName: 'اسم الملف',
            placeholderFileName: 'مثال: employment_contract.pdf',
            labelDescription: 'الوصف',
            placeholderDocDesc: 'ما الذي يثبته هذا المستند وأي قسم يجب عرضه على المحامي...',
            labelKeySection: 'القسم الرئيسي',
            placeholderKeySection: 'مثال: المادة 6 (رأس المال)',
            labelQuestionToAsk: 'سؤال يجب طرحه',
            placeholderQuestionToAsk: 'ما السؤال الذي يجب أن تطرحه على المحامي حول هذا المستند؟',
            saveDocBtn: 'حفظ المستند',
            viewDoc: 'عرض المحتوى',

            // Alerts
            alertDeleteLawyer: 'حذف هذا المحامي؟ ستبقى إجاباته لكن ستظهر كـ "محامٍ غير معروف".',
            alertDeleteAnswer: 'حذف هذه الإجابة؟',
            alertDeleteDoc: 'حذف هذا المستند؟',
            alertAddLawyerFirst: 'الرجاء إضافة محامٍ أولاً (اذهب إلى قسم المحامين).',
            alertSelectLawyer: 'الرجاء اختيار محامٍ.',
            alertEnterAnswer: 'الرجاء إدخال الإجابة.',

            // Misc
            unknownLawyer: 'محامٍ غير معروف',
            recLabelRedFlag: '🔴 إشارة خطر / غير معياري',
            recLabelCaution: '🟡 تحذير',
            recLabelSafe: '🟢 مقبول',
        }
    };

    function t(key) {
        return (translations[currentLang] && translations[currentLang][key]) || translations.en[key] || key;
    }

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem(LANG_KEY, lang);
        applyLanguage();
    }

    function toggleLanguage() {
        setLanguage(currentLang === 'en' ? 'ar' : 'en');
    }

    function applyLanguage() {
        const html = document.documentElement;
        html.lang = currentLang;
        html.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

        // Update all static elements with data-i18n
        $$('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            el.textContent = t(key);
        });

        // Update all placeholders
        $$('[data-i18n-placeholder]').forEach(el => {
            el.placeholder = t(el.dataset.i18nPlaceholder);
        });

        // Update toggle button label
        const toggleBtn = $('#langToggle');
        if (toggleBtn) {
            toggleBtn.textContent = t('langToggleLabel');
        }

        // Re-render current view
        if (currentView === 'dashboard') renderDashboard();
        if (currentView === 'lawyers') renderLawyers();
        if (currentView === 'documents') renderDocuments();
        if (currentView === 'documentation') renderDocumentation();
        if (currentView === 'compare') renderCompare();
        if (currentView === 'painpoint' && currentPainpoint) renderPainpointDetail(currentPainpoint);
    }

    // ─── Storage ────────────────────────────
    async function loadData() {
        const { data: { user } } = await window.supabase.auth.getUser();
        if (!user) return;

        // Fetch painpoints
        const { data: pps } = await window.supabase.from('painpoints').select('*');
        if (pps && pps.length > 0) {
            state.painpoints = pps;
            // Fetch questions for each painpoint
            const { data: qs } = await window.supabase.from('questions').select('*');
            state.painpoints.forEach(pp => {
                pp.questions = qs.filter(q => q.painpoint_id === pp.id);
                pp.questions.forEach(q => q.answers = []); // Answers will be fetched next
            });
            // Fetch answers
            const { data: ans } = await window.supabase.from('answers').select('*');
            if (ans) {
                state.painpoints.forEach(pp => {
                    pp.questions.forEach(q => {
                        q.answers = ans.filter(a => a.question_id === q.id);
                    });
                });
            }
        } else {
            // First time user, sync defaults
            await syncDefaultsToSupabase(user.id);
            return loadData(); // Re-fetch now that defaults are in DB
        }

        // Fetch lawyers
        const { data: lawyers } = await window.supabase.from('lawyers').select('*');
        if (lawyers) state.lawyers = lawyers;

        // Fetch documents
        const { data: docs } = await window.supabase.from('documents').select('*');
        if (docs) state.documents = docs;

        renderDashboard();
    }

    async function syncDefaultsToSupabase(userId) {
        const defaults = getDefaultState();
        for (const pp of defaults.painpoints) {
            const { questions, ...ppData } = pp;
            await window.supabase.from('painpoints').upsert({ ...ppData, user_id: userId });
            for (const q of questions) {
                const { answers, ...qData } = q;
                await window.supabase.from('questions').upsert({ ...qData, painpoint_id: pp.id, user_id: userId });
            }
        }
        for (const doc of defaults.documents) {
            await window.supabase.from('documents').upsert({ ...doc, user_id: userId });
        }
    }

    async function saveLawyer(lawyer) {
        const { data: { user } } = await window.supabase.auth.getUser();
        if (!user) return;
        const { data, error } = await window.supabase.from('lawyers').upsert({ ...lawyer, user_id: user.id }).select();
        return data ? data[0] : null;
    }

    async function deleteLawyer(id) {
        await window.supabase.from('lawyers').delete().eq('id', id);
    }

    async function saveAnswer(answer) {
        const { data: { user } } = await window.supabase.auth.getUser();
        if (!user) return;
        const { data } = await window.supabase.from('answers').upsert({ ...answer, user_id: user.id }).select();
        return data ? data[0] : null;
    }

    async function deleteAnswer(id) {
        await window.supabase.from('answers').delete().eq('id', id);
    }

    async function saveDocument(doc) {
        const { data: { user } } = await window.supabase.auth.getUser();
        if (!user) return;
        const { data } = await window.supabase.from('documents').upsert({ ...doc, user_id: user.id }).select();
        return data ? data[0] : null;
    }

    async function deleteDocument(id) {
        await window.supabase.from('documents').delete().eq('id', id);
    }

    async function updatePainpointStatus(id, status) {
        await window.supabase.from('painpoints').update({ status }).eq('id', id);
    }

    // ─── Default Data ──────────────────────
    function getDefaultState() {
        return {
            painpoints: [
                {
                    id: 'vesting',
                    title: 'The "Vesting Start" Gaslight',
                    shortDesc: 'Gustavo wants to reset your vesting to zero (Feb 2026). You have been working since Jan 2024. He claims the Spanish amendment resets everything because of "new funding."',
                    evidence: 'SAFE Note + Jan 8 Amendment',
                    status: 'unresolved',
                    questions: [
                        {
                            id: 'v1',
                            text: 'I have a SAFE Note from Sept 2024 proving the company had a $7M valuation and I was a founder then. Is it standard in Saudi Arabia to "reset" a founder\'s service to zero just because of new investment?',
                            evidence: 'SAFE Note Sept 2024',
                            answers: []
                        },
                        {
                            id: 'v2',
                            text: 'I signed an amendment for a Spanish entity to extend a "cliff." Does that legally force me to change my "Vesting Start Date" in this new Saudi LLC? Or are they separate legal issues?',
                            evidence: 'Spanish Amendment Dec 25',
                            answers: []
                        },
                        {
                            id: 'v3',
                            text: 'What is the difference between a "Cliff" (waiting period) and "Vesting Start" (earning period) under KSA practice?',
                            evidence: 'Crucial distinction',
                            answers: []
                        }
                    ]
                },
                {
                    id: 'article80',
                    title: 'The "Article 80" Death Trap',
                    shortDesc: 'The draft says if you are fired under Article 80 of the Saudi Labor Law, you are a "Bad Leaver" and lose your shares. Article 80 covers "disobedience" or "not following instructions" — totally subjective.',
                    evidence: 'Draft Page 36',
                    status: 'unresolved',
                    questions: [
                        {
                            id: 'a1',
                            text: 'As a 38.5% Partner registered in the AoA, is it standard to have my ownership tied to Labor Law disciplinary articles? Or should "Bad Leaver" triggers be limited to Objective Facts like a Final Court Judgment for fraud or a criminal conviction?',
                            evidence: 'AoA — 38.5% partnership',
                            answers: []
                        },
                        {
                            id: 'a2',
                            text: 'Does this clause give the CEO the power to strip me of my equity without a court order?',
                            evidence: 'Draft Page 36',
                            answers: []
                        }
                    ]
                },
                {
                    id: 'fakedebt',
                    title: 'The "Fake Debt"',
                    shortDesc: 'Your notarized Articles of Association (AoA) say your capital is "Paid in Full." Gustavo\'s draft says you still owe it — creating a legal debt that doesn\'t exist.',
                    evidence: 'AoA Article 6',
                    status: 'unresolved',
                    questions: [
                        {
                            id: 'f1',
                            text: 'My AoA says my capital is paid. This side-agreement says it is NOT. If I sign this, am I creating a legal debt that doesn\'t exist? In a conflict, does the registered AoA or this private contract prevail in a Saudi court?',
                            evidence: 'AoA Article 6 vs Draft',
                            answers: []
                        }
                    ]
                },
                {
                    id: 'nominal',
                    title: 'The "Nominal Value" Steal',
                    shortDesc: 'If you are a "Bad Leaver," the company buys your shares for "Nominal Value" (pennies). Since the company is worth millions (per the SAFE note), Gustavo can fire you and take your millions for 9,000 SAR.',
                    evidence: 'Clause 18.2',
                    status: 'unresolved',
                    questions: [
                        {
                            id: 'n1',
                            text: 'Is a buyback at "Nominal Value" for a subjective "Bad Leaver" trigger considered Unjust Enrichment or predatory under the New Saudi Companies Law?',
                            evidence: 'Clause 18.2 — Nominal Value buyback',
                            answers: []
                        }
                    ]
                },
                {
                    id: 'cureperiod',
                    title: 'The "10-Day" Setup',
                    shortDesc: 'You only have 10 days to "fix" a breach. This is unreasonably short for a CTO dealing with complex technical or business issues.',
                    evidence: 'Page 36 snippet',
                    status: 'unresolved',
                    questions: [
                        {
                            id: 'c1',
                            text: 'Is a 10-day cure period reasonable for a CTO, or is 60-90 days the market standard for tech founders in KSA?',
                            evidence: 'Draft — 10-day cure clause',
                            answers: []
                        }
                    ]
                },
                {
                    id: 'spanish',
                    title: 'Spanish Amendment Confusion',
                    shortDesc: 'A recently signed amendment extended the "Cliff" (waiting period) for the Spanish entity, but is being used to justify a "Vesting Reset" (earning period) in the Saudi LLC.',
                    evidence: 'Rommaana - amendment Dec 25.pdf',
                    status: 'unresolved',
                    questions: [
                        {
                            id: 's1',
                            text: 'I signed this extension for a Spanish entity. Does a "Cliff Extension" legally allow my partner to "Reset" my vesting years to zero in the new Saudi company? Or should I still get credit for my 2024 start date?',
                            evidence: 'Clause 1.1 — Extension of Cliff Period',
                            answers: []
                        }
                    ]
                }
            ],
            lawyers: [],
            documents: [
                {
                    id: 'doc_aoa',
                    name: 'Articles of Association (AoA)',
                    fileName: 'ContractByNationalNumber.pdf',
                    description: 'Official Saudi government document proving 38.5% partnership and capital "Paid in Full."',
                    keySection: 'Article 6 (Capital)',
                    questionToAsk: 'Since this Ministry-stamped document says my capital is paid, is it legal for my partner to force me to sign a side-contract saying I still owe it?',
                    sharedWith: [],
                    isDefault: true
                },
                {
                    id: 'doc_safe',
                    name: '2024 SAFE Note (Proof of History)',
                    fileName: 'Jaume Cases Marco - Postmoney Safe...pdf',
                    description: 'Proves the company was active and valuable in 2024 with a $7,000,000 Valuation Cap. Destroys the argument that service only starts in Feb 2026.',
                    keySection: 'Page 1 — Date: Sept 2024, $7M Valuation Cap',
                    questionToAsk: 'This investment was made in 2024 based on my role as a founder. Does this prove that my Vesting Start Date should be January 17, 2024, regardless of when the Saudi LLC was registered?',
                    sharedWith: [],
                    isDefault: true
                },
                {
                    id: 'doc_spanish',
                    name: 'Spanish "Cliff" Amendment',
                    fileName: 'Rommaana - amendment Dec 25.pdf',
                    description: 'Signed to extend the waiting period (Cliff), NOT to reset the earning period (Vesting). Gustavo is confusing the two to take 2024-2025 shares.',
                    keySection: 'Clause 1.1 (Extension of Cliff Period)',
                    questionToAsk: 'I signed this extension for a Spanish entity. Does a "Cliff Extension" legally allow my partner to "Reset" my vesting years to zero in the new Saudi company? Or should I still get credit for my 2024 start date?',
                    sharedWith: [],
                    isDefault: true
                },
                {
                    id: 'doc_draft',
                    name: 'New Bilingual Draft (The "Trap")',
                    fileName: 'Founders Agreement- Bilingual (Final).pdf',
                    description: 'The dangerous draft containing the Article 80 trigger. Allows Gustavo to fire for "disobedience" and take shares.',
                    keySection: 'Page 36 — Bad Leaver Table',
                    questionToAsk: 'Is it standard in KSA for a 38.5% Partner to be subject to Article 80 of the Labor Law as a reason to lose their equity? Shouldn\'t "Bad Leaver" be restricted to Objective Criminal Acts or a Final Court Judgment?',
                    sharedWith: [],
                    isDefault: true
                }
            ]
        };
    }

    // ─── State ─────────────────────────────
    let state = loadState() || getDefaultState();

    // Ensure all default questions exist (if user had an older version)
    const defaults = getDefaultState();
    defaults.painpoints.forEach(dp => {
        const sp = state.painpoints.find(p => p.id === dp.id);
        if (!sp) {
            state.painpoints.push(dp);
        } else {
            dp.questions.forEach(dq => {
                if (!sp.questions.find(q => q.id === dq.id)) {
                    sp.questions.push(dq);
                }
            });
        }
    });
    defaults.documents.forEach(dd => {
        if (!state.documents.find(d => d.id === dd.id)) {
            state.documents.push(dd);
        }
    });
    saveState();

    // ─── Current UI State ──────────────────
    let currentView = 'dashboard';
    let currentPainpoint = null;

    // ─── DOM refs ──────────────────────────
    const sidebar = $('#sidebar');
    const hamburger = $('#hamburger');
    const sidebarOverlay = $('#sidebarOverlay');

    // ─── Navigation ────────────────────────
    function navigateTo(view, painpointId) {
        currentView = view;
        if (painpointId) currentPainpoint = painpointId;

        $$('.view-section').forEach(s => s.classList.remove('active'));
        $$('.nav-item').forEach(n => n.classList.remove('active'));

        if (view === 'painpoint') {
            $('#view-painpoint').classList.add('active');
            const navItem = $(`[data-painpoint="${painpointId}"]`);
            if (navItem) navItem.classList.add('active');
            renderPainpointDetail(painpointId);
        } else {
            const section = $(`#view-${view}`);
            if (section) section.classList.add('active');
            const navItem = $(`[data-view="${view}"]:not([data-painpoint])`);
            if (navItem) navItem.classList.add('active');
        }

        // Close mobile sidebar
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('open');

        // Re-render
        if (view === 'dashboard') renderDashboard();
        if (view === 'lawyers') renderLawyers();
        if (view === 'documents') renderDocuments();
        if (view === 'documentation') renderDocumentation();
        if (view === 'compare') renderCompare();
    }

    // Sidebar nav clicks
    $$('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const view = item.dataset.view;
            const pp = item.dataset.painpoint;
            navigateTo(view, pp);
        });
    });

    // Back to dashboard
    $('#backToDashboard').addEventListener('click', () => navigateTo('dashboard'));

    // Mobile menu
    hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('open');
    });
    sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('open');
    });

    // Language toggle
    $('#langToggle').addEventListener('click', toggleLanguage);

    // ─── Dashboard Rendering ──────────────
    function renderDashboard() {
        // Stats
        const total = state.painpoints.length;
        const unresolved = state.painpoints.filter(p => p.status === 'unresolved').length;
        const inProgress = state.painpoints.filter(p => p.status === 'in-progress').length;
        const resolved = state.painpoints.filter(p => p.status === 'resolved').length;
        const totalAnswers = state.painpoints.reduce((sum, p) => sum + p.questions.reduce((s, q) => s + q.answers.length, 0), 0);

        $('#dashboardStats').innerHTML = `
      <div class="stat-card"><div class="stat-value red">${unresolved}</div><div class="stat-label">${t('statUnresolved')}</div></div>
      <div class="stat-card"><div class="stat-value amber">${inProgress}</div><div class="stat-label">${t('statInProgress')}</div></div>
      <div class="stat-card"><div class="stat-value green">${resolved}</div><div class="stat-label">${t('statResolved')}</div></div>
      <div class="stat-card"><div class="stat-value blue">${state.lawyers.length}</div><div class="stat-label">${t('statLawyers')}</div></div>
      <div class="stat-card"><div class="stat-value blue">${totalAnswers}</div><div class="stat-label">${t('statAnswersRecorded')}</div></div>
    `;

        // Pain point cards
        const icons = { vesting: '📅', article80: '💀', fakedebt: '💰', nominal: '🪙', cureperiod: '⏰', spanish: '🇪🇸' };
        const statusLabels = {
            'unresolved': t('statusBadgeUnresolved'),
            'in-progress': t('statusBadgeInProgress'),
            'resolved': t('statusBadgeResolved')
        };
        let cardsHTML = '';
        state.painpoints.forEach((pp, i) => {
            const qCount = pp.questions.length;
            const aCount = pp.questions.reduce((s, q) => s + q.answers.length, 0);
            const qLabel = qCount !== 1 ? t('questions') : t('question');
            const aLabel = aCount !== 1 ? t('answers') : t('answer');
            cardsHTML += `
        <div class="card" data-ppid="${pp.id}">
          <div class="card-header">
            <div class="card-number">${icons[pp.id] || (i + 1)}</div>
            <span class="status-badge ${pp.status}"><span class="status-dot"></span>${statusLabels[pp.status] || pp.status}</span>
          </div>
          <div class="card-title">${pp.title}</div>
          <div class="card-desc">${pp.shortDesc}</div>
          <div class="card-footer">
            <span class="card-meta">📋 ${qCount} ${qLabel} · 💬 ${aCount} ${aLabel}</span>
            <span class="card-meta" style="color:var(--accent-amber);">📎 ${pp.evidence}</span>
          </div>
        </div>`;
        });
        $('#painpointCards').innerHTML = cardsHTML;

        // Click on card -> detail
        $$('.card[data-ppid]').forEach(card => {
            card.addEventListener('click', () => navigateTo('painpoint', card.dataset.ppid));
        });

        // Update lawyer badge
        $('#lawyerCount').textContent = state.lawyers.length;
    }

    // ─── Pain Point Detail ─────────────────
    function renderPainpointDetail(ppId) {
        const pp = state.painpoints.find(p => p.id === ppId);
        if (!pp) return;

        $('#ppDetailHeader').innerHTML = `
      <h2>${pp.title}</h2>
      <p>${pp.shortDesc}</p>
      <p style="margin-top:6px;color:var(--accent-amber);font-size:0.82rem;">📎 ${t('evidence')}: ${pp.evidence}</p>
    `;

        // Status selector
        const sel = $('#ppStatusSelect');
        sel.innerHTML = `
      <option value="unresolved" ${pp.status === 'unresolved' ? 'selected' : ''}>${t('statusUnresolved')}</option>
      <option value="in-progress" ${pp.status === 'in-progress' ? 'selected' : ''}>${t('statusInProgress')}</option>
      <option value="resolved" ${pp.status === 'resolved' ? 'selected' : ''}>${t('statusResolved')}</option>
    `;
        sel.onchange = () => {
            updatePainpointStatus(pp.id, sel.value).then(() => {
                loadData().then(() => renderPainpointDetail(pp.id));
            });
        };

        // Update status label
        const statusLabelEl = $('#ppStatusLabel');
        if (statusLabelEl) statusLabelEl.textContent = t('statusLabel');

        // Back button
        $('#backToDashboard').textContent = t('backToDashboard');

        // Questions
        let html = '';
        pp.questions.forEach(q => {
            let answersHTML = '';
            if (q.answers.length === 0) {
                answersHTML = `<div class="empty-state" style="padding:24px;"><p style="margin:0;">${t('noAnswersYet')}</p></div>`;
            } else {
                answersHTML = '<div class="answers-list">';
                q.answers.forEach((a, idx) => {
                    const lawyer = state.lawyers.find(l => l.id === a.lawyerId);
                    const lawyerName = lawyer ? lawyer.name : t('unknownLawyer');
                    const recLabel = { 'red-flag': t('recLabelRedFlag'), 'caution': t('recLabelCaution'), 'safe': t('recLabelSafe') };
                    answersHTML += `
            <div class="answer-item">
              <div class="answer-header">
                <span class="answer-lawyer">👨‍⚖️ ${lawyerName}</span>
                <div style="display:flex;gap:6px;align-items:center;">
                  <span class="answer-date">${a.date || ''}</span>
                  <button class="btn-icon btn-sm" title="Edit" onclick="window._editAnswer('${q.id}', ${idx})">✏️</button>
                  <button class="btn-icon btn-sm" title="Delete" onclick="window._deleteAnswer('${q.id}', ${idx})">🗑️</button>
                </div>
              </div>
              <div class="answer-text">${escapeHTML(a.text)}</div>
              ${a.recommendation ? `<span class="answer-recommendation ${a.recommendation}">${recLabel[a.recommendation] || a.recommendation}</span>` : ''}
            </div>`;
                });
                answersHTML += '</div>';
            }

            html += `
        <div class="question-detail-panel">
          <div class="question-text">"${escapeHTML(q.text)}"</div>
          <div class="question-evidence">📎 ${q.evidence}</div>
          <div class="flex-between mb-1">
            <span style="font-size:0.78rem;color:var(--text-muted);font-weight:600;">${t('answersLabel')} (${q.answers.length})</span>
            <button class="btn btn-sm btn-primary" onclick="window._addAnswer('${q.id}')">${t('addAnswer')}</button>
          </div>
          ${answersHTML}
        </div>`;
        });
        $('#ppQuestions').innerHTML = html;

        // Render Related Documents
        const relatedDocs = window.notebookSources.filter(d => d.painpointIds && d.painpointIds.includes(ppId));
        const docsContainer = $('#ppRelatedDocs');

        if (relatedDocs.length > 0) {
            let docsHtml = `<h3 style="margin-bottom:16px; font-size:1.1rem; border-bottom:1px solid var(--border-color); padding-bottom:8px;">${t('relatedDocuments')}</h3>
            <div class="cards-grid" style="grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));">`;

            relatedDocs.forEach(doc => {
                const icon = doc.type === 'image' ? '🖼️' : '📄';
                docsHtml += `
                <div class="card" onclick="window._viewDoc('${doc.id}')" style="cursor:pointer; min-height:100px;">
                    <div class="card-header" style="justify-content:flex-start; gap:10px;">
                        <span style="font-size:1.5rem;">${icon}</span>
                        <div class="card-title" style="font-size:0.95rem; margin-bottom:0;">${doc.title}</div>
                    </div>
                </div>`;
            });
            docsHtml += `</div>`;
            docsContainer.innerHTML = docsHtml;
        } else {
            docsContainer.innerHTML = '';
        }
    }

    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // ─── Lawyers ───────────────────────────
    function renderLawyers() {
        const container = $('#lawyerCards');
        const empty = $('#lawyerEmptyState');

        if (state.lawyers.length === 0) {
            container.innerHTML = '';
            empty.classList.remove('hidden');
            // Update empty state text
            const emptyTitle = empty.querySelector('h3');
            const emptyDesc = empty.querySelector('p');
            if (emptyTitle) emptyTitle.textContent = t('noLawyersTitle');
            if (emptyDesc) emptyDesc.textContent = t('noLawyersDesc');
            return;
        }

        empty.classList.add('hidden');

        let html = '';
        state.lawyers.forEach(l => {
            const initials = l.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
            const totalAnswers = state.painpoints.reduce((sum, pp) =>
                sum + pp.questions.reduce((s, q) => s + q.answers.filter(a => a.lawyerId === l.id).length, 0), 0);
            html += `
        <div class="lawyer-card">
          <div class="lawyer-avatar">${initials}</div>
          <div class="lawyer-name">${escapeHTML(l.name)}</div>
          <div class="lawyer-firm">${escapeHTML(l.firm || t('independent'))}</div>
          <div class="lawyer-meta">
            ${l.specialization ? `<span>🏷️ ${escapeHTML(l.specialization)}</span>` : ''}
            ${l.consultDate ? `<span>📅 ${l.consultDate}</span>` : ''}
            ${l.phone ? `<span>📱 ${escapeHTML(l.phone)}</span>` : ''}
            ${l.email ? `<span>✉️ ${escapeHTML(l.email)}</span>` : ''}
            <span>💬 ${totalAnswers} ${t('answersRecorded')}</span>
          </div>
          ${l.notes ? `<p style="margin-top:10px;font-size:0.78rem;color:var(--text-muted);line-height:1.4;">${escapeHTML(l.notes)}</p>` : ''}
          <div class="lawyer-actions">
            <button class="btn btn-sm btn-secondary" onclick="window._editLawyer('${l.id}')">${t('editBtn')}</button>
            <button class="btn btn-sm btn-danger" onclick="window._deleteLawyer('${l.id}')">${t('deleteBtn')}</button>
          </div>
        </div>`;
        });
        container.innerHTML = html;
        $('#lawyerCount').textContent = state.lawyers.length;
    }

    // ─── Documents ─────────────────────────
    function renderDocuments() {
        let html = '';
        state.documents.forEach(doc => {
            let sharedHTML = `<div class="doc-shared"><span class="doc-shared-label">${t('sharedWith')}</span>`;
            if (state.lawyers.length === 0) {
                sharedHTML += `<span style="font-size:0.72rem;color:var(--text-muted);font-style:italic;">${t('addLawyersFirst')}</span>`;
            } else {
                state.lawyers.forEach(l => {
                    const isShared = doc.sharedWith.includes(l.id);
                    if (isShared) {
                        sharedHTML += `<span class="doc-shared-lawyer" onclick="window._toggleDocShare('${doc.id}','${l.id}')">✓ ${escapeHTML(l.name)}</span>`;
                    } else {
                        sharedHTML += `<span class="doc-not-shared" onclick="window._toggleDocShare('${doc.id}','${l.id}')" title="Click to mark as shared">${escapeHTML(l.name)}</span>`;
                    }
                });
            }
            sharedHTML += '</div>';

            html += `
        <div class="doc-item">
          <div class="doc-header">
            <div class="doc-icon">📄</div>
            <div>
              <div class="doc-title">${escapeHTML(doc.name)}</div>
              <div class="doc-filename">${escapeHTML(doc.fileName || '')}</div>
              ${doc.keySection ? `<div style="margin-top:4px;font-size:0.75rem;color:var(--accent-amber);">📌 ${t('keySection')}: ${escapeHTML(doc.keySection)}</div>` : ''}
            </div>
            <div style="margin-left:auto;display:flex;gap:6px;">
              <button class="btn-icon btn-sm" title="Edit" onclick="window._editDoc('${doc.id}')">✏️</button>
              ${!doc.isDefault ? `<button class="btn-icon btn-sm" title="Delete" onclick="window._deleteDoc('${doc.id}')">🗑️</button>` : ''}
            </div>
          </div>
          <div class="doc-desc">${escapeHTML(doc.description || '')}</div>
          ${doc.questionToAsk ? `<div class="doc-question">${escapeHTML(doc.questionToAsk)}</div>` : ''}
          ${sharedHTML}
        </div>`;
        });
        $('#docList').innerHTML = html;
    }

    // ─── Documentation Library ──────────────
    function renderDocumentation() {
        const container = $('#documentationList');
        if (!window.notebookSources || window.notebookSources.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>No documentation loaded.</p></div>';
            return;
        }

        let html = '';
        window.notebookSources.forEach(doc => {
            const icon = doc.type === 'image' ? '🖼️' : '📄';
            html += `
        <div class="doc-item">
          <div class="doc-header">
            <div class="doc-icon">${icon}</div>
            <div style="flex:1;">
              <div class="doc-title">${escapeHTML(doc.title)}</div>
              <div class="doc-desc" style="margin-top:4px;font-size:0.75rem;color:var(--text-muted);">${doc.type.toUpperCase()}</div>
            </div>
            <button class="btn btn-sm btn-secondary" onclick="window._viewDoc('${doc.id}')">${t('viewDoc')}</button>
          </div>
        </div>`;
        });
        container.innerHTML = html;
    }

    // ─── View Doc Modal ────────────────────
    window._viewDoc = (id) => {
        const doc = window.notebookSources.find(d => d.id === id);
        if (!doc) return;

        $('#contentModalTitle').textContent = doc.title;
        const body = $('#contentModalBody');

        if (doc.type === 'image') {
            // Split content by newlines to find URLs
            const lines = doc.content.split(/\r?\n/).filter(line => line.trim() !== '');
            let html = '<div style="display:flex;flex-direction:column;gap:16px;">';
            lines.forEach(line => {
                const urlMatch = line.match(/(https?:\/\/[^\s]+)/);
                if (urlMatch) {
                    html += `
                    <div>
                        <img src="${urlMatch[0]}" style="max-width:100%;border-radius:4px;border:1px solid var(--border-color);"
                             onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                        <div style="display:none; padding:32px; background:var(--bg-secondary); border:1px dashed var(--border-color); border-radius:4px; text-align:center;">
                            <p style="margin-bottom:8px; font-size:1.5rem;">⚠️</p>
                            <p style="margin:0; color:var(--text-secondary);">${t('imageLoadError') || 'Image could not be loaded (link usage expired).'}</p>
                        </div>
                    </div>`;
                } else if (!line.match(/^[0-9a-f-]{36}$/)) { // Skip UUIDs if possible
                    html += `<p>${escapeHTML(line)}</p>`;
                }
            });
            html += '</div>';
            body.innerHTML = html;
        } else {
            // Text content
            body.textContent = doc.content;
        }

        openModal('contentModal');
    };

    $('#closeContentModal').addEventListener('click', () => closeModal('contentModal'));

    // ─── Compare View ──────────────────────
    function renderCompare() {
        const filter = $('#compareFilter');
        // Populate filter options
        let opts = `<option value="all">${t('allQuestions')}</option>`;
        state.painpoints.forEach(pp => {
            opts += `<option value="${pp.id}">${pp.title}</option>`;
        });
        filter.innerHTML = opts;

        filter.onchange = () => renderCompareTable();
        renderCompareTable();
    }

    function renderCompareTable() {
        const filterVal = $('#compareFilter').value;
        const container = $('#compareContainer');

        if (state.lawyers.length === 0) {
            container.innerHTML = `<div class="empty-state"><div class="empty-icon">⚖️</div><h3>${t('addLawyersFirstCompare')}</h3><p>${t('addLawyersFirstCompareDesc')}</p></div>`;
            return;
        }

        const pps = filterVal === 'all' ? state.painpoints : state.painpoints.filter(p => p.id === filterVal);
        let allQuestions = [];
        pps.forEach(pp => {
            pp.questions.forEach(q => {
                allQuestions.push({ ppTitle: pp.title, ...q });
            });
        });

        if (allQuestions.length === 0) {
            container.innerHTML = `<div class="empty-state"><p>${t('noQuestionsFound')}</p></div>`;
            return;
        }

        let ths = `<th>${t('questionHeader')}</th>`;
        state.lawyers.forEach(l => { ths += `<th>${escapeHTML(l.name)}</th>`; });

        let rows = '';
        allQuestions.forEach(q => {
            rows += '<tr>';
            rows += `<td class="compare-question-cell"><strong style="color:var(--accent-blue);font-size:0.72rem;">${escapeHTML(q.ppTitle)}</strong><br>${escapeHTML(q.text)}</td>`;
            state.lawyers.forEach(l => {
                const ans = q.answers.find(a => a.lawyerId === l.id);
                if (ans) {
                    const recColor = { 'red-flag': 'var(--accent-red)', 'caution': 'var(--accent-amber)', 'safe': 'var(--accent-green)' };
                    const recEmoji = { 'red-flag': '🔴', 'caution': '🟡', 'safe': '🟢' };
                    rows += `<td>${escapeHTML(ans.text)}${ans.recommendation ? `<br><span style="color:${recColor[ans.recommendation] || 'inherit'};font-size:0.72rem;font-weight:600;">${recEmoji[ans.recommendation] || ''} ${ans.recommendation.replace('-', ' ')}</span>` : ''}</td>`;
                } else {
                    rows += `<td class="compare-no-answer">${t('noAnswer')}</td>`;
                }
            });
            rows += '</tr>';
        });

        container.innerHTML = `<table class="compare-table"><thead><tr>${ths}</tr></thead><tbody>${rows}</tbody></table>`;
    }

    // ─── Modal Helpers ─────────────────────
    function openModal(id) { $(`#${id}`).classList.add('active'); }
    function closeModal(id) { $(`#${id}`).classList.remove('active'); }

    // Close modals on overlay click
    $$('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', e => {
            if (e.target === overlay) overlay.classList.remove('active');
        });
    });

    // ─── Lawyer CRUD ───────────────────────
    function openLawyerModal(lawyerId) {
        const form = $('#lawyerForm');
        form.reset();
        $('#lawyerEditId').value = '';

        if (lawyerId) {
            const l = state.lawyers.find(x => x.id === lawyerId);
            if (!l) return;
            $('#lawyerModalTitle').textContent = t('editLawyerTitle');
            $('#lawyerEditId').value = l.id;
            $('#lawyerName').value = l.name;
            $('#lawyerFirm').value = l.firm || '';
            $('#lawyerSpec').value = l.specialization || '';
            $('#lawyerDate').value = l.consultDate || '';
            $('#lawyerPhone').value = l.phone || '';
            $('#lawyerEmail').value = l.email || '';
            $('#lawyerNotes').value = l.notes || '';
        } else {
            $('#lawyerModalTitle').textContent = t('addLawyerTitle');
        }

        // Update form labels
        updateModalLabels();
        openModal('lawyerModal');
    }

    function updateModalLabels() {
        // Lawyer modal labels
        $$('#lawyerForm [data-i18n]').forEach(el => {
            el.textContent = t(el.dataset.i18n);
        });
        $$('#lawyerForm [data-i18n-placeholder]').forEach(el => {
            el.placeholder = t(el.dataset.i18nPlaceholder);
        });
        // Answer modal labels
        $$('#answerForm [data-i18n]').forEach(el => {
            el.textContent = t(el.dataset.i18n);
        });
        $$('#answerForm [data-i18n-placeholder]').forEach(el => {
            el.placeholder = t(el.dataset.i18nPlaceholder);
        });
        // Doc modal labels
        $$('#docForm [data-i18n]').forEach(el => {
            el.textContent = t(el.dataset.i18n);
        });
        $$('#docForm [data-i18n-placeholder]').forEach(el => {
            el.placeholder = t(el.dataset.i18nPlaceholder);
        });

        // Update recommendation options
        const recSel = $('#answerRecommendation');
        if (recSel) {
            recSel.options[0].textContent = t('selectDefault');
            if (recSel.options[1]) recSel.options[1].textContent = t('recRedFlag');
            if (recSel.options[2]) recSel.options[2].textContent = t('recCaution');
            if (recSel.options[3]) recSel.options[3].textContent = t('recSafe');
        }
    }

    $('#addLawyerBtn').addEventListener('click', () => openLawyerModal());
    $('#addLawyerBtn2').addEventListener('click', () => openLawyerModal());
    $('#closeLawyerModal').addEventListener('click', () => closeModal('lawyerModal'));
    $('#cancelLawyer').addEventListener('click', () => closeModal('lawyerModal'));

    $('#lawyerForm').addEventListener('submit', e => {
        e.preventDefault();
        const editId = $('#lawyerEditId').value;
        const data = {
            name: $('#lawyerName').value.trim(),
            firm: $('#lawyerFirm').value.trim(),
            specialization: $('#lawyerSpec').value.trim(),
            consultDate: $('#lawyerDate').value,
            phone: $('#lawyerPhone').value.trim(),
            email: $('#lawyerEmail').value.trim(),
            notes: $('#lawyerNotes').value.trim()
        };

        if (editId) {
            data.id = editId;
        }

        saveLawyer(data).then(() => {
            loadData();
            closeModal('lawyerModal');
        });
    });

    window._editLawyer = (id) => openLawyerModal(id);
    window._deleteLawyer = (id) => {
        if (!confirm(t('alertDeleteLawyer'))) return;
        deleteLawyer(id).then(() => {
            loadData();
        });
    };

    // ─── Answer CRUD ───────────────────────
    window._addAnswer = (questionId) => {
        if (state.lawyers.length === 0) {
            alert(t('alertAddLawyerFirst'));
            return;
        }
        $('#answerForm').reset();
        $('#answerQuestionId').value = questionId;
        $('#answerEditIdx').value = '';

        // Find question text
        let qText = '';
        state.painpoints.forEach(pp => {
            const q = pp.questions.find(q => q.id === questionId);
            if (q) qText = q.text;
        });
        $('#answerQuestionText').textContent = qText;

        // Populate lawyer select
        let opts = `<option value="">${t('selectLawyerPlaceholder')}</option>`;
        state.lawyers.forEach(l => { opts += `<option value="${l.id}">${l.name}</option>`; });
        $('#answerLawyer').innerHTML = opts;

        // Update modal title
        $('#answerModalTitle').textContent = t('answerModalTitle');
        updateModalLabels();
        openModal('answerModal');
    };

    window._editAnswer = (questionId, ansIdx) => {
        let question = null;
        state.painpoints.forEach(pp => {
            const q = pp.questions.find(q => q.id === questionId);
            if (q) question = q;
        });
        if (!question || !question.answers[ansIdx]) return;

        const a = question.answers[ansIdx];
        $('#answerForm').reset();
        $('#answerQuestionId').value = questionId;
        $('#answerEditIdx').value = ansIdx;
        $('#answerQuestionText').textContent = question.text;

        let opts = `<option value="">${t('selectLawyerPlaceholder')}</option>`;
        state.lawyers.forEach(l => { opts += `<option value="${l.id}" ${l.id === a.lawyerId ? 'selected' : ''}>${l.name}</option>`; });
        $('#answerLawyer').innerHTML = opts;

        $('#answerText').value = a.text;
        $('#answerRecommendation').value = a.recommendation || '';

        $('#answerModalTitle').textContent = t('answerModalTitle');
        updateModalLabels();
        openModal('answerModal');
    };

    window._deleteAnswer = (questionId, ansIdx) => {
        if (!confirm(t('alertDeleteAnswer'))) return;
        state.painpoints.forEach(pp => {
            const q = pp.questions.find(q => q.id === questionId);
            if (q) { q.answers.splice(ansIdx, 1); }
        });
        saveState();
        renderPainpointDetail(currentPainpoint);
    };

    $('#closeAnswerModal').addEventListener('click', () => closeModal('answerModal'));
    $('#cancelAnswer').addEventListener('click', () => closeModal('answerModal'));

    $('#answerForm').addEventListener('submit', e => {
        e.preventDefault();
        const questionId = $('#answerQuestionId').value;
        const editIdx = $('#answerEditIdx').value;
        const lawyerId = $('#answerLawyer').value;
        const text = $('#answerText').value.trim();
        const recommendation = $('#answerRecommendation').value;

        if (!lawyerId) { alert(t('alertSelectLawyer')); return; }
        if (!text) { alert(t('alertEnterAnswer')); return; }

        const data = {
            question_id: questionId,
            lawyer_id: lawyerId,
            text: text,
            recommendation: recommendation,
            date: new Date().toISOString().split('T')[0]
        };

        if (editIdx !== '') {
            // Get original ID if editing
            let question = null;
            state.painpoints.forEach(pp => {
                const q = pp.questions.find(q => q.id === questionId);
                if (q) question = q;
            });
            data.id = question.answers[parseInt(editIdx)].id;
        }

        saveAnswer(data).then(() => {
            loadData().then(() => {
                closeModal('answerModal');
                renderPainpointDetail(currentPainpoint);
            });
        });
    });

    // ─── Document CRUD ─────────────────────
    function openDocModal(docId) {
        const form = $('#docForm');
        form.reset();
        $('#docEditId').value = '';

        if (docId) {
            const d = state.documents.find(x => x.id === docId);
            if (!d) return;
            $('#docModalTitle').textContent = t('editDocTitle');
            $('#docEditId').value = d.id;
            $('#docName').value = d.name || '';
            $('#docFileName').value = d.fileName || '';
            $('#docDesc').value = d.description || '';
            $('#docSection').value = d.keySection || '';
            $('#docQuestion').value = d.questionToAsk || '';
        } else {
            $('#docModalTitle').textContent = t('addDocTitle');
        }
        updateModalLabels();
        openModal('docModal');
    }

    $('#addDocBtn').addEventListener('click', () => openDocModal());
    $('#closeDocModal').addEventListener('click', () => closeModal('docModal'));
    $('#cancelDoc').addEventListener('click', () => closeModal('docModal'));

    $('#docForm').addEventListener('submit', e => {
        e.preventDefault();
        const editId = $('#docEditId').value;
        const data = {
            name: $('#docName').value.trim(),
            fileName: $('#docFileName').value.trim(),
            description: $('#docDesc').value.trim(),
            keySection: $('#docSection').value.trim(),
            questionToAsk: $('#docQuestion').value.trim()
        };

        if (editId) {
            data.id = editId;
        }

        saveDocument(data).then(() => {
            loadData();
            closeModal('docModal');
        });
    });

    window._editDoc = (id) => openDocModal(id);
    window._deleteDoc = (id) => {
        if (!confirm(t('alertDeleteDoc'))) return;
        deleteDocument(id).then(() => {
            loadData();
        });
    };

    window._toggleDocShare = (docId, lawyerId) => {
        const doc = state.documents.find(d => d.id === docId);
        if (!doc) return;
        const idx = doc.sharedWith.indexOf(lawyerId);
        if (idx >= 0) {
            doc.sharedWith.splice(idx, 1);
        } else {
            doc.sharedWith.push(lawyerId);
        }
        saveDocument({ id: doc.id, shared_with: doc.sharedWith }).then(() => {
            loadData();
        });
    };

    // ─── Initial Render ────────────────────
    window.addEventListener('supabase-auth-success', (e) => {
        loadData();
    });

    // Handle initial state if listener was added late
    if (window.supabase) {
        window.supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) loadData();
        });
    }

    applyLanguage();

})();
