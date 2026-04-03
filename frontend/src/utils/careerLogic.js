export const calculateCareerScores = (input) => {
    let scores = {
        cse: 0,
        medical: 0,
        business: 0,
        design: 0,
        law: 0
    };

    // Interest based scoring
    if (input.interests.includes("coding")) scores.cse += 40;
    if (input.interests.includes("biology")) scores.medical += 40;
    if (input.interests.includes("business")) scores.business += 40;
    if (input.interests.includes("art") || input.interests.includes("design")) scores.design += 40;
    if (input.interests.includes("social") || input.interests.includes("debating")) scores.law += 40;

    // Strength based scoring
    if (input.strengths.includes("math")) scores.cse += 30;
    if (input.strengths.includes("memory")) scores.medical += 30;
    if (input.strengths.includes("communication")) {
        scores.business += 30;
        scores.law += 30;
    }
    if (input.strengths.includes("creativity")) scores.design += 30;

    // Academic weighting
    if (input.marks > 90) {
        scores.cse += 20;
        scores.medical += 20;
    } else if (input.marks > 70) {
        scores.cse += 10;
        scores.business += 10;
    }

    return scores;
};

export const getTopCareers = (scores) => {
    return Object.entries(scores)
        .sort((a, b) => b[1] - a[1])
        .filter(entry => entry[1] > 0) // Only return relevant matches
        .slice(0, 3)
        .map(entry => {
            const careerMap = {
                cse: { title: "Software Engineering", description: "Design and build software systems and applications.", roadmap: ["Learn Programming", "Build Personal Projects", "Get Internships"] },
                medical: { title: "Healthcare & Medicine", description: "Focused on human biology, treatment, and patient care.", roadmap: ["NEET Preparation", "Complete MBBS", "Specialization"] },
                business: { title: "Business Management", description: "Leading teams, strategy, and business operations.", roadmap: ["BBA/BCom", "Networking", "MBA"] },
                design: { title: "Creative Design", description: "Creating visual solutions for digital and physical products.", roadmap: ["Portfolio Building", "UI/UX Basics", "Design School"] },
                law: { title: "Legal Services", description: "Expertise in law, justice, and corporate compliance.", roadmap: ["CLAT Preparation", "LLB Degree", "Bar Exam"] }
            };
            return {
                id: entry[0],
                ...careerMap[entry[0]],
                score: entry[1]
            };
        });
};
