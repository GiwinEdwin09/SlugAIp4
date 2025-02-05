import { type NextRequest, NextResponse } from "next/server"
import { exec } from "child_process"
import { promises as fs } from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get("file") as File

  if (!file) {
    return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const filename = `${uuidv4()}.pdf`
  const filepath = path.join(process.cwd(), "tmp", filename)

  await fs.mkdir(path.dirname(filepath), { recursive: true })
  await fs.writeFile(filepath, buffer)

  return new Promise((resolve) => {
    exec(`python3 PDFRead.py "${filepath}"`, async (error, stdout, stderr) => {
      try {
        await fs.unlink(filepath)

        if (error) {
          console.error(`exec error: ${error}`)
          resolve(NextResponse.json({ success: false, error: "Failed to process PDF" }, { status: 500 }))
          return
        }

        const result = JSON.parse(stdout)
        if (!result.success) {
          resolve(NextResponse.json({ success: false, error: result.error }, { status: 500 }))
          return
        }

        resolve(NextResponse.json({ success: true, courses: result.data }))
      } catch (e) {
        console.error(`Error processing result: ${e}`)
        resolve(NextResponse.json({ success: false, error: "Failed to process result" }, { status: 500 }))
      }
    })
  })
}

