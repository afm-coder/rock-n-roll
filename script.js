// ==========================================
// ROCK & ROLL CHESS CLUB — SIDEBAR SCRIPT
// ==========================================

const NEXT_MEMBER_GOAL = 50;
const MEMBER_REFRESH_INTERVAL = 60 * 60 * 1000; // 1 hour

document.addEventListener("DOMContentLoaded", () => {
    const memberCountElement = document.getElementById("member-count");
    const currentMembersElement = document.getElementById("current-members");
    const progressFill = document.getElementById("progress-fill");
    const progressPercentage = document.getElementById("progress-percentage");

    // Make sure the elements that actually exist in the HTML are present.
    if (
        !memberCountElement ||
        !currentMembersElement ||
        !progressFill ||
        !progressPercentage
    ) {
        console.error("Member progress elements could not be found.");
        return;
    }

    async function updateMemberCount() {
        try {
            // Cache-busting prevents GitHub Pages from serving an old JSON file.
            const response = await fetch(
                `members.json?cacheBust=${Date.now()}`,
                {
                    cache: "no-store"
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to load members.json (${response.status})`);
            }

            const data = await response.json();

            if (typeof data.members !== "number") {
                throw new Error("members.json does not contain a valid member count.");
            }

            const members = data.members;

            // ------------------------------------------
            // BIG MEMBER COUNT
            // ------------------------------------------
            memberCountElement.textContent = `${members} 🎸`;

            // ------------------------------------------
            // MEMBER COUNT BELOW PROGRESS BAR
            // ------------------------------------------
            currentMembersElement.textContent = members;

            // ------------------------------------------
            // PROGRESS CALCULATION
            // ------------------------------------------
            const percentage = Math.min(
                (members / NEXT_MEMBER_GOAL) * 100,
                100
            );

            progressFill.style.width = `${percentage}%`;

            progressPercentage.textContent = `${Math.round(percentage)}%`;

            console.log(
                `Rock & Roll Chess Club: ${members}/${NEXT_MEMBER_GOAL} members (${Math.round(percentage)}%)`
            );

        } catch (error) {
            console.error("Could not update member count:", error);

            // Only show Loading if we don't already have a valid number.
            if (!memberCountElement.textContent.match(/\d/)) {
                memberCountElement.textContent = "Loading... 🎸";
            }
        }
    }

    // Load immediately when the sidebar opens.
    updateMemberCount();

    // Refresh once every hour while the sidebar is open.
    setInterval(updateMemberCount, MEMBER_REFRESH_INTERVAL);
});
