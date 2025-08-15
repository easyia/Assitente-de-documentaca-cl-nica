export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admin_whitelist: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          phone: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id?: string
          phone: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          phone?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          id: string
          ip_address: unknown | null
          new_data: Json | null
          old_data: Json | null
          record_id: string
          table_name: string
          timestamp: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          id?: string
          ip_address?: unknown | null
          new_data?: Json | null
          old_data?: Json | null
          record_id: string
          table_name: string
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          id?: string
          ip_address?: unknown | null
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string
          table_name?: string
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      consent_records: {
        Row: {
          consent_text: string
          consultation_id: string | null
          id: string
          ip_address: unknown | null
          is_valid: boolean | null
          patient_id: string | null
          signer_name: string
          signer_signature: string | null
          timestamp: string | null
          user_agent: string | null
        }
        Insert: {
          consent_text: string
          consultation_id?: string | null
          id?: string
          ip_address?: unknown | null
          is_valid?: boolean | null
          patient_id?: string | null
          signer_name: string
          signer_signature?: string | null
          timestamp?: string | null
          user_agent?: string | null
        }
        Update: {
          consent_text?: string
          consultation_id?: string | null
          id?: string
          ip_address?: unknown | null
          is_valid?: boolean | null
          patient_id?: string | null
          signer_name?: string
          signer_signature?: string | null
          timestamp?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consent_records_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "consultations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consent_records_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      consultations: {
        Row: {
          audio_file_path: string | null
          chief_complaint: string | null
          consent_recorded: boolean | null
          consent_timestamp: string | null
          consultation_date: string | null
          created_at: string | null
          doctor_id: string
          duration_minutes: number | null
          id: string
          metadata: Json | null
          organization_id: string | null
          patient_id: string
          status: Database["public"]["Enums"]["consultation_status"] | null
          updated_at: string | null
        }
        Insert: {
          audio_file_path?: string | null
          chief_complaint?: string | null
          consent_recorded?: boolean | null
          consent_timestamp?: string | null
          consultation_date?: string | null
          created_at?: string | null
          doctor_id: string
          duration_minutes?: number | null
          id?: string
          metadata?: Json | null
          organization_id?: string | null
          patient_id: string
          status?: Database["public"]["Enums"]["consultation_status"] | null
          updated_at?: string | null
        }
        Update: {
          audio_file_path?: string | null
          chief_complaint?: string | null
          consent_recorded?: boolean | null
          consent_timestamp?: string | null
          consultation_date?: string | null
          created_at?: string | null
          doctor_id?: string
          duration_minutes?: number | null
          id?: string
          metadata?: Json | null
          organization_id?: string | null
          patient_id?: string
          status?: Database["public"]["Enums"]["consultation_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consultations_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultations_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          address: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      document_templates: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          json_schema: Json | null
          language: string | null
          name: string
          system_prompt: string
          template_content: string
          type: Database["public"]["Enums"]["document_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          json_schema?: Json | null
          language?: string | null
          name: string
          system_prompt: string
          template_content: string
          type: Database["public"]["Enums"]["document_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          json_schema?: Json | null
          language?: string | null
          name?: string
          system_prompt?: string
          template_content?: string
          type?: Database["public"]["Enums"]["document_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "document_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          consultation_id: string | null
          content_html: string | null
          content_markdown: string
          created_at: string | null
          icd10_codes: string[] | null
          id: string
          is_finalized: boolean | null
          medications: Json | null
          structured_data: Json | null
          template_id: string | null
          title: string
          type: Database["public"]["Enums"]["document_type"]
          updated_at: string | null
        }
        Insert: {
          consultation_id?: string | null
          content_html?: string | null
          content_markdown: string
          created_at?: string | null
          icd10_codes?: string[] | null
          id?: string
          is_finalized?: boolean | null
          medications?: Json | null
          structured_data?: Json | null
          template_id?: string | null
          title: string
          type: Database["public"]["Enums"]["document_type"]
          updated_at?: string | null
        }
        Update: {
          consultation_id?: string | null
          content_html?: string | null
          content_markdown?: string
          created_at?: string | null
          icd10_codes?: string[] | null
          id?: string
          is_finalized?: boolean | null
          medications?: Json | null
          structured_data?: Json | null
          template_id?: string | null
          title?: string
          type?: Database["public"]["Enums"]["document_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "consultations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "document_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      embeddings: {
        Row: {
          consultation_id: string | null
          content_text: string
          content_type: string
          created_at: string | null
          document_id: string | null
          embedding: string | null
          id: string
          metadata: Json | null
        }
        Insert: {
          consultation_id?: string | null
          content_text: string
          content_type: string
          created_at?: string | null
          document_id?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
        }
        Update: {
          consultation_id?: string | null
          content_text?: string
          content_type?: string
          created_at?: string | null
          document_id?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "embeddings_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "consultations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "embeddings_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          attempts: number | null
          completed_at: string | null
          consultation_id: string | null
          created_at: string | null
          error_message: string | null
          id: string
          job_type: string
          max_attempts: number | null
          payload: Json | null
          result: Json | null
          scheduled_at: string | null
          started_at: string | null
          status: Database["public"]["Enums"]["job_status"] | null
        }
        Insert: {
          attempts?: number | null
          completed_at?: string | null
          consultation_id?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          job_type: string
          max_attempts?: number | null
          payload?: Json | null
          result?: Json | null
          scheduled_at?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["job_status"] | null
        }
        Update: {
          attempts?: number | null
          completed_at?: string | null
          consultation_id?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          job_type?: string
          max_attempts?: number | null
          payload?: Json | null
          result?: Json | null
          scheduled_at?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["job_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "consultations"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          consent_marketing: boolean
          created_at: string
          email: string
          id: string
          name: string
          whatsapp: string | null
        }
        Insert: {
          consent_marketing?: boolean
          created_at?: string
          email: string
          id?: string
          name: string
          whatsapp?: string | null
        }
        Update: {
          consent_marketing?: boolean
          created_at?: string
          email?: string
          id?: string
          name?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          product_id: string
          quantity: number
          total: number | null
          unit_price: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          product_id: string
          quantity: number
          total?: number | null
          unit_price: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          total?: number | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          customer_id: string | null
          id: string
          status: Database["public"]["Enums"]["order_status"]
          total_amount: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          id?: string
          status?: Database["public"]["Enums"]["order_status"]
          total_amount?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          id?: string
          status?: Database["public"]["Enums"]["order_status"]
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          address: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string
          phone: string | null
          tax_id: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          tax_id?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          tax_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      patients: {
        Row: {
          address: string | null
          allergies: string | null
          birth_date: string | null
          created_at: string | null
          current_medications: string | null
          dni: string
          email: string | null
          emergency_contact: string | null
          full_name: string
          gender: string | null
          id: string
          medical_history: string | null
          organization_id: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          allergies?: string | null
          birth_date?: string | null
          created_at?: string | null
          current_medications?: string | null
          dni: string
          email?: string | null
          emergency_contact?: string | null
          full_name: string
          gender?: string | null
          id?: string
          medical_history?: string | null
          organization_id?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          allergies?: string | null
          birth_date?: string | null
          created_at?: string | null
          current_medications?: string | null
          dni?: string
          email?: string | null
          emergency_contact?: string | null
          full_name?: string
          gender?: string | null
          id?: string
          medical_history?: string | null
          organization_id?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patients_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          brand: string | null
          category_id: string | null
          cost_price: number
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          price: number
          sale_price: number
          stock_quantity: number
          updated_at: string
        }
        Insert: {
          brand?: string | null
          category_id?: string | null
          cost_price?: number
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          price?: number
          sale_price?: number
          stock_quantity?: number
          updated_at?: string
        }
        Update: {
          brand?: string | null
          category_id?: string | null
          cost_price?: number
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price?: number
          sale_price?: number
          stock_quantity?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      transcriptions: {
        Row: {
          confidence_score: number | null
          consultation_id: string | null
          created_at: string | null
          id: string
          language: string | null
          metadata: Json | null
          processing_time_ms: number | null
          provider: string | null
          raw_text: string
        }
        Insert: {
          confidence_score?: number | null
          consultation_id?: string | null
          created_at?: string | null
          id?: string
          language?: string | null
          metadata?: Json | null
          processing_time_ms?: number | null
          provider?: string | null
          raw_text: string
        }
        Update: {
          confidence_score?: number | null
          consultation_id?: string | null
          created_at?: string | null
          id?: string
          language?: string | null
          metadata?: Json | null
          processing_time_ms?: number | null
          provider?: string | null
          raw_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "transcriptions_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "consultations"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          medical_license: string | null
          organization_id: string | null
          role: Database["public"]["Enums"]["app_role"]
          specialty: string | null
          updated_at: string
          user_role: Database["public"]["Enums"]["user_role"] | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          medical_license?: string | null
          organization_id?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          specialty?: string | null
          updated_at?: string
          user_role?: Database["public"]["Enums"]["user_role"] | null
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          medical_license?: string | null
          organization_id?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          specialty?: string | null
          updated_at?: string
          user_role?: Database["public"]["Enums"]["user_role"] | null
        }
        Relationships: [
          {
            foreignKeyName: "users_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      is_admin: {
        Args: { uid: string }
        Returns: boolean
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: unknown
      }
      promote_self_to_admin: {
        Args: { input_phone: string }
        Returns: boolean
      }
      rpc_create_consultation: {
        Args: {
          p_chief_complaint?: string
          p_metadata?: Json
          p_patient_id: string
        }
        Returns: string
      }
      rpc_enqueue_generate_documents: {
        Args: { p_consultation_id: string }
        Returns: string
      }
      rpc_get_consultation_details: {
        Args: { p_consultation_id: string }
        Returns: {
          consent_data: Json
          consultation_id: string
          documents_data: Json
          patient_data: Json
          transcription_data: Json
        }[]
      }
      rpc_record_consent: {
        Args: {
          p_consent_text: string
          p_consultation_id: string
          p_patient_id: string
          p_signer_name: string
          p_signer_signature?: string
        }
        Returns: string
      }
      rpc_save_document: {
        Args: {
          p_consultation_id: string
          p_content_html?: string
          p_content_markdown: string
          p_document_type: Database["public"]["Enums"]["document_type"]
          p_icd10_codes?: string[]
          p_medications?: Json
          p_structured_data?: Json
          p_template_id: string
          p_title: string
        }
        Returns: string
      }
      rpc_save_transcription: {
        Args: {
          p_confidence_score?: number
          p_consultation_id: string
          p_language?: string
          p_metadata?: Json
          p_processing_time_ms?: number
          p_provider?: string
          p_raw_text: string
        }
        Returns: string
      }
      rpc_semantic_search: {
        Args: { p_limit?: number; p_query_text: string }
        Returns: {
          consultation_date: string
          consultation_id: string
          content_type: string
          matched_content: string
          patient_name: string
          similarity: number
        }[]
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      app_role: "admin" | "user"
      consultation_status:
        | "pending"
        | "recording"
        | "transcribing"
        | "generating_documents"
        | "completed"
        | "archived"
      document_type:
        | "soap"
        | "anamnesis"
        | "prescription"
        | "medical_certificate"
        | "lab_order"
        | "referral"
        | "discharge_report"
        | "informed_consent"
        | "patient_summary"
        | "medical_report"
      job_status: "pending" | "processing" | "completed" | "failed"
      order_status: "new" | "picking" | "shipped" | "delivered" | "canceled"
      user_role: "doctor" | "admin" | "nurse"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      consultation_status: [
        "pending",
        "recording",
        "transcribing",
        "generating_documents",
        "completed",
        "archived",
      ],
      document_type: [
        "soap",
        "anamnesis",
        "prescription",
        "medical_certificate",
        "lab_order",
        "referral",
        "discharge_report",
        "informed_consent",
        "patient_summary",
        "medical_report",
      ],
      job_status: ["pending", "processing", "completed", "failed"],
      order_status: ["new", "picking", "shipped", "delivered", "canceled"],
      user_role: ["doctor", "admin", "nurse"],
    },
  },
} as const
