export interface SecurityAndAnalysis {
  secret_scanning: { status: string };
  secret_scanning_push_protection: { status: string };
  dependabot_security_updates: { status: string };
  secret_scanning_non_provider_patterns?: { status: string };
  secret_scanning_validity_checks?: { status: string };
}
