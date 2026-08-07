let passed = 0;
let failed = 0;

export const section = (title) => {

    console.log("\n=================================");
    console.log(title);
    console.log("=================================\n");

};

export const pass = (title) => {

    passed++;

    console.log(`✅ ${title}`);

};

export const fail = (
    title,
    message = ""
) => {

    failed++;

    console.log(`❌ ${title}`);

    if (message) {

        console.log(`   ${message}`);

    }

};

export const summary = () => {

    console.log("\n=================================");
    console.log(`Passed : ${passed}`);
    console.log(`Failed : ${failed}`);
    console.log("=================================\n");

};