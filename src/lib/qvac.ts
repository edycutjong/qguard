export class QVACService {
  private isInitialized = false;
  private backendUrl = "http://127.0.0.1:8000/api";

  async initialize() {
    if (this.isInitialized) return;
    this.isInitialized = true;
  }

  async runOcrScanner(imageUrl: string): Promise<{ text: string, amountFound: number | null }> {
    await this.initialize();
    
    try {
      const response = await fetch(`${this.backendUrl}/ocr`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageUrl })
      });
      if (!response.ok) throw new Error("Backend offline");
      return await response.json();
    } catch (e) {
      console.warn("[QVAC SDK] OCR backend unreachable, falling back to mock");
      await new Promise(resolve => setTimeout(resolve, 1500));
      return {
        text: "Total: $1,240.00",
        amountFound: 1240.00
      };
    }
  }

  async runVoiceToText(audioData: Blob | any): Promise<string> {
    await this.initialize();
    
    try {
      const formData = new FormData();
      if (audioData) formData.append("audio", audioData);
      
      const response = await fetch(`${this.backendUrl}/stt`, {
        method: 'POST',
        body: formData
      });
      if (!response.ok) throw new Error("Backend offline");
      const data = await response.json();
      return data.text;
    } catch (e) {
      console.warn("[QVAC SDK] STT backend unreachable, falling back to mock");
      await new Promise(resolve => setTimeout(resolve, 2000));
      return "Show me all transactions over $1000 last week";
    }
  }

  async runLlmRiskScan(astData: string): Promise<{ riskScore: number, findings: string[] }> {
    await this.initialize();
    
    try {
      const response = await fetch(`${this.backendUrl}/llm/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: astData })
      });
      if (!response.ok) throw new Error("Backend offline");
      return await response.json();
    } catch (e) {
      console.warn("[QVAC SDK] LLM backend unreachable, falling back to mock");
      await new Promise(resolve => setTimeout(resolve, 1500));
      return {
        riskScore: 87,
        findings: [
          "Contract contains hidden mint function",
          "Deployer funded by known Tornado Cash mixer",
          "Approval requested for unlimited tokens"
        ]
      };
    }
  }
}

// Singleton instance
export const qvacService = new QVACService();
