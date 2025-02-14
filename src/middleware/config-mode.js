// export function configMode(req, res, next) {
// Ensure res.locals.scripts and res.locals.styles exist
// res.locals.scripts = res.locals.scripts || [];
// res.locals.styles = res.locals.styles || [];

// Example: Add a default style (optional)
// res.locals.styles.push("/css/styles.css");

// Example: If in development mode, add a debugging script
// if (process.env.MODE === "development") {
//   res.locals.scripts.push(`
//         <script>
//           console.log("Development Mode: Scripts Loaded Dynamically");
//         </script>
//       `);
//   }

//   next();
// }

export function configMode(req, res, next) {
  res.locals.scripts = res.locals.scripts || [];
  res.locals.styles = res.locals.styles || [];

  // Get the current mode (default to 'production')
  const MODE = process.env.MODE || "production";
  res.locals.isDevMode = MODE === "development"; //  Boolean flag

  // Set development mode message (initially empty)
  res.locals.devModeMsg = "";

  // Always load the main stylesheet
  res.locals.styles.push("/css/main.css");

  //  If in development mode, add a debugging script and a UI message
  if (res.locals.isDevMode) {
    console.log("🚀 Running in Development Mode");

    // Set dev mode warning message
    res.locals.devModeMsg = "⚠️ Warning: You are in Development Mode!";

    // Add a console log script for debugging
    res.locals.scripts.push(`
      <script>
        console.log("Development Mode: Scripts Loaded Dynamically");
      </script>
    `);
  }

  next();
}
