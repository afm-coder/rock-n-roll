/* =========================================================
   ROCK AND ROLL CHESS CLUB
   COMPLETE JAVASCRIPT
   ================================================= */


/* =========================================================
   MEMBER PROGRESS SYSTEM
   ================================================= */


/* =========================================================
   SETTINGS
   ================================================= */

const NEXT_MEMBER_GOAL = 20;

const MEMBER_REFRESH_INTERVAL =
    60 * 60 * 1000;


/* =========================================================
   FIND MEMBER ELEMENTS
   ================================================= */

const memberCountElement =
    document.getElementById(
        "member-count"
    );


const progressFill =
    document.getElementById(
        "progress-fill"
    );


const progressPercentage =
    document.getElementById(
        "progress-percentage"
    );


const progressCurrent =
    document.getElementById(
        "current-members"
    );


/* =========================================================
   LOAD MEMBER COUNT
   ========================================================= */

async function loadMemberCount() {


    /* =====================================================
       CHECK THAT ELEMENTS EXIST
       ===================================================== */

    if (

        !memberCountElement ||

        !progressFill ||

        !progressPercentage ||

        !progressCurrent

    ) {

        console.error(
            "ROCK AND ROLL: Member progress elements were not found."
        );

        return;

    }


    /* =====================================================
       LOADING STATE
       ===================================================== */

    memberCountElement.textContent =
        "Loading... 🎸";


    try {


        /* =================================================
           BUILD MEMBERS.JSON URL
           ================================================= */

        const membersURL =
            new URL(
                "members.json",
                window.location.href
            );


        /* =================================================
           CACHE BUSTING
           ================================================= */

        membersURL.searchParams.set(
            "cache",
            Date.now()
        );


        console.log(
            "ROCK AND ROLL: Loading member data from:",
            membersURL.href
        );


        /* =================================================
           FETCH MEMBERS.JSON
           ================================================= */

        const response =
            await fetch(

                membersURL.href,

                {
                    method:
                        "GET",

                    cache:
                        "no-store",

                    headers: {

                        "Cache-Control":
                            "no-cache"

                    }

                }

            );


        /* =================================================
           CHECK RESPONSE
           ================================================= */

        if (!response.ok) {

            throw new Error(

                "Could not load members.json. HTTP " +
                response.status

            );

        }


        /* =================================================
           READ JSON
           ================================================= */

        const data =
            await response.json();


        console.log(
            "ROCK AND ROLL: members.json returned:",
            data
        );


        /* =================================================
           VALIDATE MEMBER COUNT
           ================================================= */

        if (
            typeof data.members !== "number"
        ) {

            throw new Error(
                "members.json does not contain a valid 'members' number."
            );

        }


        /* =================================================
           GET CURRENT MEMBER COUNT
           ================================================= */

        const memberCount =
            data.members;


        /* =================================================
           CALCULATE PROGRESS
           ================================================= */

        let percentage =
            (
                memberCount /
                NEXT_MEMBER_GOAL
            ) * 100;


        /* =================================================
           KEEP PROGRESS BETWEEN 0 AND 100
           ================================================= */

        percentage =
            Math.max(

                0,

                Math.min(
                    percentage,
                    100
                )

            );


        /* =================================================
           DISPLAY MEMBER COUNT
           ================================================= */

        memberCountElement.textContent =
            memberCount + " 🎸";


        /* =================================================
           DISPLAY CURRENT MEMBER COUNT
           LEFT OF BAR
           ================================================= */

        progressCurrent.textContent =
            memberCount;


        /* =================================================
           UPDATE PROGRESS BAR
           ================================================= */

        progressFill.style.width =
            percentage + "%";


        /* =================================================
           UPDATE PERCENTAGE
           ================================================= */

        progressPercentage.textContent =
            Math.round(
                percentage
            ) + "%";


        /* =================================================
           SUCCESS LOG
           ================================================= */

        console.log(
            "ROCK AND ROLL: Member count updated to",
            memberCount
        );


        console.log(
            "ROCK AND ROLL: Progress:",
            Math.round(
                percentage
            ) + "%"
        );


    }

    catch (error) {


        /* =================================================
           ERROR HANDLING
           ================================================= */

        console.error(
            "ROCK AND ROLL: Could not load member count.",
            error
        );


        memberCountElement.textContent =
            "⚠️ Error loading members";


        progressPercentage.textContent =
            "Error";


    }

}


/* =========================================================
   INITIAL MEMBER LOAD
   ========================================================= */

loadMemberCount();


/* =========================================================
   REFRESH MEMBER DATA
   EVERY HOUR WHILE PAGE IS OPEN
   ========================================================= */

setInterval(

    function () {

        loadMemberCount();

    },

    MEMBER_REFRESH_INTERVAL

);


/* =========================================================
   GOLDEN / LIME SPARKLE SYSTEM
   ========================================================= */


/* =========================================================
   FIND SPARKLE CONTAINER
   ========================================================= */

const sparkleContainer =
    document.getElementById(
        "sparkles"
    );


/* =========================================================
   MAKE SURE CONTAINER EXISTS
   ========================================================= */

if (sparkleContainer) {


    /* =====================================================
       SPARKLE TYPES
       ===================================================== */

    const sparkleTypes = [

        "✦",

        "✦",

        "✦",

        "✦",

        "⋆"

    ];


    /* =====================================================
       CREATE SPARKLE
       ===================================================== */

    function createSparkle() {


        /* =================================================
           CREATE SPAN
           ================================================= */

        const sparkle =
            document.createElement(
                "span"
            );


        /* =================================================
           ADD CLASS
           ================================================= */

        sparkle.className =
            "sparkle";


        /* =================================================
           CHOOSE RANDOM STAR
           ================================================= */

        sparkle.textContent =
            sparkleTypes[

                Math.floor(

                    Math.random() *
                    sparkleTypes.length

                )

            ];


        /* =================================================
           RANDOM HORIZONTAL POSITION
           ================================================= */

        sparkle.style.left =
            (
                Math.random() * 94 + 3
            ) + "%";


        /* =================================================
           RANDOM VERTICAL POSITION
           ================================================= */

        sparkle.style.top =
            (
                Math.random() * 94 + 3
            ) + "%";


        /* =================================================
           RANDOM STAR SIZE
           ================================================= */

        const size =
            Math.random() * 5 + 8;


        sparkle.style.fontSize =
            size + "px";


        /* =================================================
           RANDOM ANIMATION DURATION
           ================================================= */

        const duration =
            Math.random() * 2.5 + 2.5;


        sparkle.style.setProperty(

            "--duration",

            duration + "s"

        );


        /* =================================================
           ADD STAR TO SIDEBAR
           ================================================= */

        sparkleContainer.appendChild(
            sparkle
        );


        /* =================================================
           REMOVE STAR AFTER ANIMATION
           ================================================= */

        setTimeout(

            function () {

                sparkle.remove();

            },

            (duration * 1000) + 200

        );

    }


    /* =====================================================
       INITIAL STAR BURST
       ===================================================== */

    for (

        let i = 0;

        i < 8;

        i++

    ) {

        setTimeout(

            createSparkle,

            Math.random() * 500

        );

    }


    /* =====================================================
       CONTINUOUS STAR GENERATION
       ===================================================== */

    setInterval(

        function () {

            createSparkle();

        },

        700

    );

}
