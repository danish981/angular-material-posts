To create a shortcut in Windows that lets you type `gcm "the commit message"` and have it execute `git add . && git commit -m "the commit message"` under the hood, you can use one of these two approaches: a batch script or a PowerShell function. I’ll walk you through the batch script method since it’s lightweight and works seamlessly in the Command Prompt (cmd), which is likely what you’re using if you want a simple command-line shortcut.

### Solution: Batch Script
Here’s how to set it up:

1. **Create a Batch File**:
   - Open Notepad or any text editor.
   - Write the following code:
     ```bat
     @echo off
     git add . && git commit -m "%~1"
     ```
   - Save it as `gcm.bat` (make sure it’s `.bat`, not `.txt`) in a folder like `C:\Scripts`. The `%~1` grabs the first argument you pass (your commit message) and strips any surrounding quotes if present.

2. **Add the Folder to Your System PATH**:
   - Right-click "This PC" or "My Computer" > "Properties" > "Advanced system settings" > "Environment Variables".
   - Under "System variables" (or "User variables" if you want it just for your account), find and edit the `Path` variable.
   - Add a new entry: `C:\Scripts` (or wherever you saved `gcm.bat`).
   - Click OK to save and close all dialogs.

3. **Test It**:
   - Open a new Command Prompt (or restart your current one to reload the PATH).
   - Navigate to a Git repository folder (e.g., `cd C:\my-project`).
   - Type: `gcm "Added a md file"`.
   - Press Enter. It should run `git add . && git commit -m "Added a md file"`.

### How It Works
- `gcm.bat` is now a callable command because it’s in your PATH.
- When you type `gcm "message"`, the batch file takes `"message"` as `%1` and passes it to `git commit -m`.
- The `&&` ensures `git commit` only runs if `git add .` succeeds.

### Notes
- **Quotes**: You’ll need to include quotes around your commit message if it has spaces (e.g., `gcm "my message"`). If it’s a single word, quotes are optional (e.g., `gcm update`).
- **Git Installation**: Make sure Git is installed and added to your PATH (so `git` works in cmd by itself).
- **Alternative**: If you use PowerShell, you could define a function in your profile instead:
  ```powershell
  function gcm($message) { git add .; git commit -m $message }
  ```
  Add that to `$PROFILE` (run `notepad $PROFILE` to edit it), but the batch method is simpler for cmd users.

Now, just type `gcm "your message"` and you’re good to go! Let me know if you hit any snags.