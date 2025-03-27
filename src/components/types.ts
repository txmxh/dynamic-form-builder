export interface Field {
    id: number;
    type: string;
    label: string;
    value: string | boolean; // Allow boolean for checkboxes
    options?: string[]; // Optional for select/radio fields
  }
  
  
  export interface Section {
    id: number;
    title: string;
    fields: Field[];
    hidden?: boolean;  // ✅ Add this line
  }

  
  