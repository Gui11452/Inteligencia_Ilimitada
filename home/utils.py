import whois
import requests
from googlesearch import search
from datetime import datetime, timezone
import socket
import ssl

def extract_domain_url(url):
    domain = url.replace('http://', '').replace('https://', '').strip('/')
    domain = domain.split('/')
    domain = domain[0]
    return domain

def is_ssl_valid(domain):
    try:
        # Remove 'http://' ou 'https://' se presente
        domain = domain.replace('http://', '').replace('https://', '').strip('/')

        # Conecta ao servidor usando SSL
        context = ssl.create_default_context()
        with socket.create_connection((domain, 443), timeout=5) as sock:
            with context.wrap_socket(sock, server_hostname=domain) as ssock:
                # Obter o certificado do servidor
                cert = ssock.getpeercert()

                # Extrair a data de expiração do certificado
                not_after = cert['notAfter']
                expiration_date = datetime.strptime(not_after, "%b %d %H:%M:%S %Y %Z")

                # Tornar o objeto datetime "timezone-aware"
                expiration_date = expiration_date.replace(tzinfo=timezone.utc)

                # Verificar se o certificado está expirado
                now = datetime.now(timezone.utc)  # Obtém a data e hora atuais em UTC
                if expiration_date > now:
                    return True  # Certificado é válido
                else:
                    return False  # Certificado expirou
    except Exception as e:
        print(f"Erro ao verificar SSL do domínio {domain}: {e}")
        return False  # Não foi possível verificar o SSL ou o SSL não é válido


def is_valid_domain(domain):
    try:
        # Faz a consulta WHOIS para o domínio
        domain_info = whois.whois(domain)

        # Verifica se a data de criação está presente, o que indica que o domínio existe e está registrado
        if domain_info.creation_date:
            return True
        else:
            return False
    except Exception as e:
        # Se houver qualquer erro na consulta WHOIS (ex: domínio não encontrado), retorna False
        # print(f"Erro ao verificar o domínio: {e}")
        return False

# Função para calcular o tempo de vida do domínio
def calculate_domain_age(creation_date):
    if isinstance(creation_date, list):
        creation_date = creation_date[0]  # Considera a primeira data de criação

    age_in_days = (datetime.now() - creation_date).days
    age_in_years = age_in_days // 365
    age_in_months = (age_in_days % 365) // 30

    if age_in_years > 0:
        return f"{age_in_years} anos e {age_in_months} meses"
    elif age_in_months > 0:
        return f"{age_in_months} meses"
    else:
        return "menos de um mês"

# Função para verificar se o site é novo e calcular seu tempo de vida
def check_domain_age(domain, valid_domain):
    if not valid_domain:
        return 'Inválido', None
    try:
        domain_info = whois.whois(domain)
        creation_date = domain_info.creation_date

        # Se creation_date for uma lista, considerar a primeira data válida
        if isinstance(creation_date, list):
            creation_date = creation_date[0]

        if not creation_date or not isinstance(creation_date, datetime):
            return None, None

        age_description = calculate_domain_age(creation_date)
        is_new_site = (datetime.now() - creation_date).days < 365  # Considera "novo" se tiver menos de um ano
        return age_description, is_new_site
    except Exception as e:
        # print(f"Erro ao verificar a idade do domínio: {e}")
        return None, None

# Função para contar resultados no Google
def google_results_count(query):
    try:
        results = list(search(query))
        return len(results)
    except Exception as e:
        print(f"Erro ao buscar resultados no Google: {e}")
        return 0
    
# Lista de TLDs populares
popular_tlds = ['.com', '.net', '.org', '.com.br', '.edu', '.gov', '.co', '.io', '.co.uk', '.de', '.fr']
def is_popular_tld(url):
    #clean_url = extract_domain_url(url)

    # Extrai a parte após o primeiro ponto
    domain_parts = url.split('.')
    if len(domain_parts) < 2:
        return False  # Se o domínio não contiver uma extensão válida, não é popular

    # Tenta combinar as partes do domínio para encontrar o TLD mais longo correspondente
    for i in range(len(domain_parts) - 1):
        tld = '.' + '.'.join(domain_parts[i + 1:])
        if tld in popular_tlds:
            return True

    return False

# Função principal para verificar se um link é seguro
def check_website_safety(url):
    domain = extract_domain_url(url)  # Extrai o domínio do URL
    # print(f"Verificando segurança do site: {domain}")

    valid_domain = is_valid_domain(domain)

    ssl_valid = is_ssl_valid(domain) if valid_domain else False

    # print(f"HTTPS ativo: {'Sim' if https_status else 'Não'}")

    # Verifica idade do domínio
    age_description, is_new_site = check_domain_age(domain, valid_domain)
    """ if age_description:
        print(f"Tempo de registro: {age_description}")
        if is_new_site:
            print("Cuidado. Esse site é relativamente novo.")
    else:
        print("Não foi possível determinar a idade do domínio.") """
    
    popular_domain = is_popular_tld(domain) if valid_domain else False

    # Conta resultados no Google
    #google_count = google_results_count(domain)
    # print(f"Resultados do Google: {google_count}")

    return {
        'domain': domain,
        'valid_domain': valid_domain,
        'ssl_valid': ssl_valid,
        'domain_age': {
            'is_new_site': is_new_site,
            'age_description': age_description,
        },
        'popular_domain': popular_domain,
        #'utils_google': {
            #'len_search': 'little' if google_count < 5 else 'very',
            #'google_count': google_count,
        #},
    }



